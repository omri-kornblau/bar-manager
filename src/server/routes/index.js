const _ = require("lodash")
const Express = require("express") 

const router = Express.Router 

// Imports routes
const routes = [
  ...require("./user")
] 

const wrapWithSchemeValidation = (route) => async (req, res) => {
  const schemeValidRoots = ["body", "query", "params"] 

  await Promise.all(schemeValidRoots.map(async (root) => {
    const schemePart = route?.scheme[root] 
    if (_.isNil(schemePart)) return 

    await schemePart.validate(req[root]) 
  })) 

  if (route.handler instanceof Promise) return await route.handler(req, res) 
  return router.handler(req, res) 
}


routes.forEach((route) => {
  const routerMethod = router[route.method] 
  routerMethod(...route.middleware, route.path, wrapWithSchemeValidation(route))
})

module.exports = router 
