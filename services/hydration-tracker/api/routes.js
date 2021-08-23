const controller = require('./controller');

module.exports = (app) => {
    app.post("/update_water_intake", async (req, res) => {
        const { amount } = req.body;
        const resp = await controller.updateWaterIntake({amount});
        res.send(resp);
    });

    app.post("/get_all_water_intake", async (req, res) => {
        const { amount } = req.body;
        const resp = await controller.getAllWaterIntake();
        res.send(resp);
    });
};