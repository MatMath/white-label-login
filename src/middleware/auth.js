const jwt = require('jsonwebtoken');

function decodeToken (req, res, next) {
  if (!req.cookies) {
    return next(new Error('Cookie are required to decode token'));
  }
  const user = jwt.decode(req.cookies.token);
  req.user = user;
  next();
}

// TODO: Validate Token.

const checkAppPermision = (opts) => (req, res, next) => {
  if (!req.user) {
    // Redirect to login
    return res.redirect(opts.redirect);
  }
  if (req.user.email) {
    return next();
  }
}

module.exports = { decodeToken, checkAppPermision };
