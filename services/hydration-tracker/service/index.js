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

module.exports = {
    updateWaterIntake,
};