const mongoose = require('mongoose');
const { updateWaterIntake } = require('./service');

const main = async () => {
  try {
    // Connection to the database
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.MONGO_DB_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log("Database connected");
    await updateWaterIntake(300);

  } catch (err) {
    console.log('Failed to connect mongo for: ', err);
  }
};

main();