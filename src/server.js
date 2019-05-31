const path = require('path');
const express = require('express');

const app = express();
const DIST_DIR = __dirname;
const HTML_FILE = path.join(DIST_DIR, '../dist', 'index.html');

console.log('DIST_DIR:', DIST_DIR);
console.log('HTML_FILE:', HTML_FILE);

app.use(express.static(DIST_DIR));
app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
});
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
