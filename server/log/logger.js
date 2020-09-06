const _ = require("lodash");
const Winston = require("winston");
const format = Winston.format;
const ExpressWinston = require("express-winston");
const ElasticsearchTransport = require("winston-elasticsearch");
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: "http://localhost:9200",
  auth: {
    username: "elastic",
    password: "changeme"
  }
})

const options = {
  console: {
    format: format.simple()
  },
  elasticsearch: {
    level: "info",
    indexPrefix: "gse-beta",
    client,
    transformer: (logData, e) => {
      const { level, message, meta } = logData;
      const fixedMeta = _.isNil(meta.meta) ? meta : meta.meta;

      return {
        "@timestamp": new Date(),
        ...fixedMeta,
        level,
        message
      }
    }
  }
};

const winstonConfig = {
  transports: [
    new ElasticsearchTransport(options.elasticsearch),
    new Winston.transports.Console()
  ],
  format: format.combine(
    format.json()
  )
}

const logger = Winston.createLogger(winstonConfig);

logger.on("error", (error) => console.error("Winston error caught", error));

const expressWinston = ExpressWinston.logger({
  winstonInstance: logger,
  meta: true,
  expressFormat: true,
  requestWhitelist: ["username", "method", "url"],
  responseWhitelist: ["body", "statusCode"],
})

exports.logger = logger;
exports.expressWinston = expressWinston;
