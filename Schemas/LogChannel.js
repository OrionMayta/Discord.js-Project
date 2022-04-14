const { model, Schema } = require("mongoose");

module.exports = model(
  "LogChannel",
  new Schema({
    Guild: String,
    Channel: String,
  })
);
