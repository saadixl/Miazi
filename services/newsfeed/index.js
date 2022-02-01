const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());

require('./api/routes')(app);

app.listen(process.env.PORT || 3004, () => {
    console.log("newsfeed service started");
});