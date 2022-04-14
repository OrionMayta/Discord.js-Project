const { model, Schema } = require("mongoose");

module.exports = model(
  "WarnDB",
  new Schema({
      userId: String,
      guildId: String,
      reason: String,
      moderatorId: String,
      reason: String,
      timestamp: Number,
  })
);
