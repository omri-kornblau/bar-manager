const Mongoose = require("mongoose");

const Client = require("./client");

const Provider = Mongoose.model("Provider", Client.schema);
Provider.yupProviderSchema = Client.yupClientSchema;

module.exports = Provider;
