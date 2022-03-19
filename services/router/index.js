const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
    res.send(`Hello World! The server date-time is now ${new Date().toString()}.\nThis domain is used for Software Engineering experiments only. This message is sent from the router service.`);
});

app.listen(port, () => {
    console.log(`api service listening at http://localhost:${port}`)
});