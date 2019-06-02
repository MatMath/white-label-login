const { expect } = require('chai');
const { decodeToken } = require('../src/middleware/auth');

describe.only('middleware', () => {
  it('should decode the JWT token', () => {
    const req = {
      cookies: {
        token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6Im1hdGhpZXUubGVnYXVsdEBjcmVtZWdsb2JhbC5jb20iLCJleHAiOjE1NTkzMTE0OTUsImVtYWlsIjoibWF0aGlldS5sZWdhdWx0QGNyZW1lZ2xvYmFsLmNvbSJ9.fJ9n-hdla8udLafTFX4JM5kAaZx1jEqU5iToP2N-z60"
      }
    }
    decodeToken(req, {}, () => {});
    expect(req.user).to.deep.equal({ user_id: 5,
      username: 'mathieu.legault@cremeglobal.com',
      exp: 1559311495,
      email: 'mathieu.legault@cremeglobal.com'
    });
  });

  it('should pass the error if no cookies', (done) => {
    const nextMock = (err) => {
      expect(err.message).to.equal('Cookie are required to decode token');
      done();
    }
    decodeToken({}, {}, nextMock);
  });

  it('should not error if missing token', () => {
    const req = {
      cookies: {}
    }
    decodeToken(req, {}, () => {});
    expect(req.user).to.equal(null);
  });

  it('should not error if invalid token', () => {
    const req = {
      cookies: {
        token: "Not the token you are looking for"
      }
    }
    decodeToken(req, {}, () => {});
    expect(req.user).to.equal(null);
  });

});
