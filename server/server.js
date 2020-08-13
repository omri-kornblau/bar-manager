const Express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
const CookieParser = require("cookie-parser");
const Logger = require("morgan");
const Path = require("path");

const AsyncErrorsHandler = require("./errors/express-async-errors");
const ErrorsRouter = require("./errors/errors-router");

// Import configurations
const ServerConfig = require("./config/server");

// Import models
require("./models/client");
require("./models/cookie");
require("./models/message");
require("./models/offer");
require("./models/oftenSampledRequest");
require("./models/sampledRequest");
require("./models/provider");
require("./models/request");
require("./models/user");
require("./models/notification");
const { createAttachment  } = require("./models/attachment");

const StatusWorker = require("./workers/requestStatus");

AsyncErrorsHandler.patchRouter(ErrorsRouter.route);

// Connect to mongodb
Mongoose
  .connect(ServerConfig.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected");
    StatusWorker.init();
    console.log("Started request status worker")
  })
  .catch(err => console.log(err));

Mongoose
  .createConnection(ServerConfig.fsDbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((gseFSConnection) => {
    createAttachment(gseFSConnection);
    console.log("MongoDB-GridFS connected")
  })
  .catch(err => console.log(err));


// Setup express server
const app = Express();

app.use(BodyParser({limit: ServerConfig.requestSizeLimit}));
app.use(BodyParser.urlencoded({
  extended: false
}));

app.use(BodyParser.json());
app.use(CookieParser());

if (ServerConfig.production) {
  app.use(Logger("combined"));
} else {
  app.use(Logger("dev"));
}

if (ServerConfig.production) {
  app.use(Express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(Path.resolve(__dirname, "..", "client", "build", "index.html"));
  });
}

app.use("/", require("./routes"));

app.listen(ServerConfig.port, ServerConfig.address, () =>
  console.log(`Server started on ${ServerConfig.address}:${ServerConfig.port}`)
);
