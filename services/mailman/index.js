const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./api/routes')(app);

app.listen(process.env.PORT || 3003, () => {
    console.log("mailman service started");
});