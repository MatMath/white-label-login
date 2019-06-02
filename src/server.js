// Global package
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const DIST_DIR = __dirname;
const login = path.join(DIST_DIR, '../dist', 'index.html');
const availableApps = {
  app1: path.join(DIST_DIR, '../dist', 'app1.html'),
  app2: path.join(DIST_DIR, '../dist', 'app2.html'),
}

// local files
const clientErrorHandler = require('./clientErrorHandler');
const { decodeToken, checkAppPermision, isUserAlreadyLoggedin } = require('./middleware/auth');

const app = express();

// Structure & handler around the request
app.use(cookieParser());
app.use(decodeToken)
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
app.get('/login', isUserAlreadyLoggedin({redirect:'/'}), (req, res) => {
  res.sendFile(login)
});

// Secured URL depending on the user.
app.get('*', checkAppPermision({redirect:'/login'}), (req, res) => {
  // Depending on the user permission load the proper app.
  // Option1: Do a BE call to see what the user have access to as default app. -> could be expensive if we have more BE routing, could eb fine on single page.
  // Option2: Inside the user's token, add the proper initial app. Required a Signed token otherwize the user can change anything he want.
  if (req.user.app && availableApps[req.user.app]) {
    return res.sendFile(availableApps[req.user.app]);
  }
  // ex: default to app, otherwize overwrite to X?
  res.sendFile(availableApps.app1);
});

module.exports = app;
