// Global package
const path = require('path');
const express = require('express');

const DIST_DIR = __dirname;
const login = path.join(DIST_DIR, '../dist', 'index.html');
const app1 = path.join(DIST_DIR, '../dist', 'app1.html');
const app2 = path.join(DIST_DIR, '../dist', 'app2.html');

// local files
const clientErrorHandler = require('./clientErrorHandler');

const app = express();

// Structure & handler around the request
app.use(require('express-bunyan-logger')({
    name: 'whiteLabelLogin',
    excludes: ['user-agent', 'req', 'res'], // Too verbose for now.
    streams: [{
        level: (process.env.NODE_ENV == 'production')? 'info' : 'warn',
        stream: process.stdout
        }]
    }));
app.use(clientErrorHandler);

// URl to handle.
app.use(express.static(DIST_DIR));
app.get('/login', (req, res) => { res.sendFile(app1) });

// Secured URL depending on the user.
// app.get('*', (req, res) => { res.sendFile(login) });
app.get('/app1', (req, res) => { res.sendFile(app1) });
app.get('/app2', (req, res) => { res.sendFile(app2) });

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
