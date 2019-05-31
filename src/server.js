const path = require('path');
const express = require('express');

const app = express();
const DIST_DIR = __dirname;
const login = path.join(DIST_DIR, '../dist', 'index.html');
const app1 = path.join(DIST_DIR, '../dist', 'app1.html');
const app2 = path.join(DIST_DIR, '../dist', 'app2.html');

app.use(express.static(DIST_DIR));
app.get('/app1', (req, res) => { res.sendFile(app1) });
app.get('/app2', (req, res) => { res.sendFile(app2) });
app.get('*', (req, res) => { res.sendFile(login) });
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
