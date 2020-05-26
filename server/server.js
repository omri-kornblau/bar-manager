const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const CookieParser = require("cookie-parser");
const Logger = require("morgan");
const Path = require("path");

const AsyncErrorsHandler = require("./errors/express-async-errors");
const ErrorsRouter = require("./errors/errors-router");

// Import configurations
const DbConfig = require("./config/db");
const ServerConfig = require("./config/server");

// Import models
require("./models/client");
require("./models/cookie");
require("./models/message");
require("./models/offer");
require("./models/oftenSampledRequest");
require("./models/oldRequest");
require("./models/provider");
require("./models/request");
require("./models/user");

AsyncErrorsHandler.patchRouter(ErrorsRouter.route);

// Connect to mongodb
Mongoose
  .connect(DbConfig.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Setup express server
const app = Express();
app.use(BodyParser.urlencoded({
  extended: false
}));
app.use(BodyParser.json());
app.use(CookieParser());

app.use("/", require("./routes"));

if (ServerConfig.production) {
  app.use(Logger("combined"));
  app.use(Express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(Path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use(Logger("dev"));
}

app.listen(ServerConfig.port, ServerConfig.address, () =>
  console.log(`Server started on ${ServerConfig.address}:${ServerConfig.port}`)
);
