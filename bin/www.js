#!/bin/node
const app = require('../src/server');

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
