const controller = require('./controller');

module.exports = (app) => {
    app.post("/send_mail", async (req, res) => {
        const { subject, to, html } = req.body;
        const resp = await controller.sendSimpleHTMLMail({subject, to, html});
        res.send(resp);
    });
};