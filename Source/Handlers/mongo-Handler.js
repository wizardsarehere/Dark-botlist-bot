const { mongoURL } = require("../Configs/botConfig");
const mongoose = require("mongoose");

mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`[DATABASE] Successfully MongoDB activated.`);
  })
  .catch((err) => {
    console.log("[DATABASE] Failed to login:\n" + err);
  });
