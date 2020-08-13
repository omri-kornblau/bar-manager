const Winston = require("winston");
const ExpressWinston = require("express-winston");
const ElasticsearchTransport = require("winston-elasticsearch");

const esTransportOpts = {
  level: "info"
};


const winstonConfig = {
  transports: [
    new Winston.transports.Console(),
    new ElasticsearchTransport(esTransportOpts)
  ],
  format: Winston.format.combine(
    Winston.format.colorize(),
    Winston.format.json()
  ),
}

const expressWinstonConfig = {
  ...winstonConfig,
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}


const logger = Winston.createLogger(winstonConfig);
const expressLogger = ExpressWinston.logger(expressWinstonConfig);

logger.on("error", (error) => console.error("Winston error caught", error));
console.log(expressLogger);

exports.expressLogger = expressLogger;
exports.logger = logger;
