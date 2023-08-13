const mongoose = require("mongoose");

const db = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_URI);
    console.log("Succesfully connected to DB!");
  } catch (err) {
    console.log("Error while connecting to DB!");
    console.log(err);
    process.abort();
  }
};

module.exports = db;
