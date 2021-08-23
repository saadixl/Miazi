const service = require('../service');

const updateWaterIntake = async (config) => {
    return await service.updateWaterIntake(config);
};

const getAllWaterIntake = async (config) => {
    return service.getAllWaterIntake(config);
};

module.exports = {
    updateWaterIntake,
    getAllWaterIntake,
};