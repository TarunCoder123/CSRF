const mongoose = require("mongoose");

async function initiDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://TarunPratapSingh:TARUN@cluster0.iuilj.mongodb.net/"
    );
    console.log("Mongo DB is connected");
  } catch (err) {
    console.log("MongoDB connection erro:", err);
  }

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  mongoose.connection.on("error", (error) => {
    console.log(`MongoDB connection error: ${error}`);
  });
}

module.exports = { initiDB, mongoose };
