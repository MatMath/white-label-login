const jwt = require('jsonwebtoken');

function decodeToken(req, res, next) {
  if (!req.cookies) {
    return next(new Error('Cookie are required to decode token'));
  }
  const user = jwt.decode(req.cookies.token);
  req.user = user;
  return next();
}

// TODO: Validate Token.

const checkAppPermision = opts => (req, res, next) => {
  if (req.user && req.user.email) {
    return next();
  }
  // Redirect to login
  return res.redirect(opts.redirect);
};

const isUserAlreadyLoggedin = opts => (req, res, next) => {
  if (req.user && req.user.email) {
    // Good token so Redirect to proper APP
    return res.redirect(opts.redirect); // TODO: Find what App is link witht he user.
  }
  return next();
};

module.exports = {
  decodeToken,
  checkAppPermision,
  isUserAlreadyLoggedin,
};
