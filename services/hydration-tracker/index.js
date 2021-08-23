const mongoose = require('mongoose');
// Connection to the database
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.MONGO_DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("1. Database connected"))
  .catch((err) => console.log(err));

const waterIntakeSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now, required: true }, // Should be a epoch timestamp
  amount: { type: Number, default: 250, required: true } // Unit of the amount is in ml
});
console.log('2. Schema created');

const waterIntake = mongoose.model('WaterIntake', waterIntakeSchema);

const waterIntakeEntry = new waterIntake({
  amount: 200
});
console.log('3. About to save the entry');
waterIntakeEntry.save((err, waterIntakeEntry) => {
  if (err) {
    return console.error(err);
  }
  return console.log('4. Water intake logged successfully!');
});
