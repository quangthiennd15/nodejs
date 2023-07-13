const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/task_company", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("success");
  } catch (error) {
    console.log("fail");
  }
}

module.exports = { connect };
