const controller = require('./controller');

module.exports = (app) => {
    app.post("/send_mail", async (req, res) => {
        const { subject, to, html } = req.body;
        console.log("Mailman received params: ", subject);
        const resp = await controller.sendSimpleHTMLMail({subject, to, html});
        res.send(resp);
    });
};