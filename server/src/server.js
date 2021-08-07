const Express = require("express")
const Mongoose = require("mongoose")
const CookieParser = require("cookie-parser")
const BodyParser = require("body-parser")
const Morgan = require("morgan")
const Path = require("path")

const AsyncErrorsHandler = require("./errors/express-async-errors")
const ErrorsRouter = require("./errors/errors-router")

// Import configurations
const ServerConfig = require("./config/server")

const { logger } = require("./log/logger")


const init = async () => {
  AsyncErrorsHandler.patchRouter(ErrorsRouter.route)

  await _connectToDb()
  await _setupAndStartServer()
}

const _connectToDb = async () => {
  // Import models (should be done before routes import)
  require("./models/button")

  try {
    await Mongoose.connect(ServerConfig.dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    logger.info("MongoDB Connected")
  } catch(err) {
    logger.error(err)
    throw err
  }
}

const _setupAndStartServer = async () => {
  const app = Express()
  const routes = require("./routes")

  app.use(BodyParser.urlencoded({ extended: false }))
  app.use(BodyParser.json({ limit: '5mb' }))
  app.use(CookieParser())
  app.use(Morgan("dev"))

  app.use("/", routes)

  if (ServerConfig.production) {
    app.use(Express.static("../client/build"))
    app.get("*", (req, res) => {
      res.sendFile(Path.resolve(__dirname, "..", "client", "build", "index.html"))
    })
  }

  await app.listen(ServerConfig.port, ServerConfig.address)

  logger.info(`Server started on ${ServerConfig.address}:${ServerConfig.port}`)

  return app
}

module.exports = {
  init
}
