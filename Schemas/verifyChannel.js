const { model, Schema } = require("mongoose");

module.exports = model(
  "verifyChannel",
  new Schema({
      GuildID: String,
      LogsChannel: String,
      RoleID: String,
  })
);
