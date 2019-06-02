const jwt = require('jsonwebtoken');

function decodeToken (req, res, next) {
  if (!req.cookies) {
    return next(new Error('Cookie are required to decode token'));
  }
  const user = jwt.decode(req.cookies.token);
  req.user = user;
  next();
}

module.exports = { decodeToken };
