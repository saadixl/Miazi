const express = require('express');
var request = require('request');
const app = express();
const port = 80;

app.get('/', (req, res) => {
    res.send(`Hello World!<br/>The server date-time is now ${new Date().toString()}.<br/>This domain is used for Software Engineering experiments only. This message is sent from the router service.`);
});

app.get('/console', (req, res) => {
    res.redirect('http://console:3000');
});

app.listen(port, () => {
    console.log(`api service listening at http://localhost:${port}`)
});