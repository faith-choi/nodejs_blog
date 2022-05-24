const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect("mongodb+srv://test:sparta@cluster0.hxu7l.mongodb.net/?retryWrites=true&w=majority", { ignoreUndefined: true }).catch((err) => {
    console.error(err);
  })
};

module.exports = connect;