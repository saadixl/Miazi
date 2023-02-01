const express = require('express');
const app = express();
const port = 80;

app.get('/', (req, res) => {
    res.send(`Hello World!<br/>The server date-time is now ${new Date().toString()}.<br/>This domain is used for Software Engineering experiments only. This message is sent from the router service.`);
});

app.get('/console', (req, res) => {
    res.redirect('http://mh7.pw:3000'); 
});

app.get('/raven', (req, res) => {
    res.redirect('http://mh7.pw:5005'); 
});

app.listen(port, () => {
    console.log(`api service listening at http://localhost:${port}`)
});
