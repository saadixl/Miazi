const mongoose = require('mongoose');

const schema = {
    createdAt: { type: Date, default: Date.now, required: true }, // Should be a epoch timestamp
    amount: { type: Number, default: 250, required: true } // Unit of the amount is in ml
};

const waterIntakeSchema = new mongoose.Schema(schema);
const waterIntakeModel = mongoose.model('WaterIntake', waterIntakeSchema);

const updateWaterIntake = (amount) => {
    const waterIntakeEntry = new waterIntakeModel({
        amount
    });
    return new Promise((resolve, reject) => {
        waterIntakeEntry.save((err, waterIntakeEntry) => {
            if (err) {
                console.error(err);
                reject();
            }
            console.log('Water intake logged successfully!');
            resolve();
        });
    });
};

const getAllWaterIntake = async () => {
    const docs = await waterIntakeModel.find({});
    console.log('Printing all the water intakes');
    docs.map((doc) => {
        console.log(doc);
    });
    return;
};

module.exports = {
    updateWaterIntake,
    getAllWaterIntake,
};