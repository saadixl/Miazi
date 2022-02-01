const controller = require('./controller');

module.exports = (app) => {
    app.get("/get_news", async (req, res) => {
        const resp = await controller.getNews(req.data);
        res.send(resp);
    });

    app.get("/list_news", async (req, res) => {
        const resp = await controller.listNews(req.data);
        res.send(resp);
    });
};