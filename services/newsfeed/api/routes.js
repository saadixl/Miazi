const controller = require('./controller');

module.exports = (app) => {
    app.get("/get_news", async (req, res) => {
        const resp = await controller.getNews(req.data);
        res.send(resp);
    });
};