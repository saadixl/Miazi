const mongoose = require('mongoose');
const { updateWaterIntake, getAllWaterIntake } = require('./service');
const express = require("express");

const connectMongoDB = async () => {
  try {
    // Connection to the database
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.log('Failed to connect mongo for: ', err);
  }
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectMongoDB();

require('./api/routes')(app);

app.listen(3006, () => {
    console.log("Hydration tracker service started");
});