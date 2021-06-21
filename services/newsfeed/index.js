const express = require("express");
const app = express();

require('./api/routes')(app);

app.listen(process.env.PORT || 3004, () => {
    console.log("newsfeed service started");
});