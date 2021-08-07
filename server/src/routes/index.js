const _ = require("lodash")
const Express = require("express")

const router = Express.Router()

// Imports routes
const routes = [
  ...require("./user"),
  ...require("./button")
]

const wrapWithSchemeValidation = (route) => async (req, res) => {
  const schemeKeys = ["body", "query", "params"]

  await Promise.all(schemeKeys.map(async (key) => {
    const schemePart = route?.scheme[key]
    if (_.isNil(schemePart)) return

    await schemePart.validate(req[key])
  }))

  if (route.handler instanceof Promise) return await route.handler(req, res)
  return route.handler(req, res)
}

routes.forEach((route) => {
  const routerMethod = router[route.method].bind(router)
  if (_.isArray(route.middleware)) {
    return routerMethod(...route.middleware, route.path, wrapWithSchemeValidation(route))
  }

  const routeHandler = wrapWithSchemeValidation(route)

  routerMethod(route.path, routeHandler)
})

module.exports = router
