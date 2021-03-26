const _ = require("lodash");

const logger = {}

logger.info = (log) => {
  console.info(log)
}

logger.warn = (log) => {
  console.warn(log)
}

logger.error = (err) => {
  console.error(err)
}

module.exports = {
  logger
}
