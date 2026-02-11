const express = require('express');
const fs = require('fs');
const app = express();

app.get('/', (req,res) => {
    res.set('Content-Type', 'text/html');
    res.send(fs.readFileSync('./game/gui/pages/index.html'))
});
app.get('/scratchembed', (req,res) => {
    const queryval = req.query.q;
    res.set('Content-Type', 'text/html');
    res.send(fs.readFileSync(`./game/gui/pages/embed${queryval}.html`))
});
app.get('/script', (req,res) => {
    res.set('Content-Type', 'application/javascript');
    res.send(fs.readFileSync('./game/scripts/main.js'))
});
app.get('/style', (req,res) => {
    res.set('Content-Type', 'text/css');
    res.send(fs.readFileSync('./game/scripts/style.css'))
});
app.listen(80);