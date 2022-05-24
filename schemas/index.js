const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect("", { ignoreUndefined: true }).catch((err) => {
    console.error(err);
  })
};

module.exports = connect;