const { expect } = require('chai');
const { decodeToken, checkAppPermision, isUserAlreadyLoggedin } = require('../../src/middleware/auth');

describe('middleware', () => {
  describe('JWT .decodeToken', () => {
    it('should decode the JWT token', () => {
      const req = {
        cookies: {
          // eslint-disable-next-line max-len
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6ImJvYiByaWdodCIsImV4cCI6MTU1OTMxMTQ5NSwiZW1haWwiOiJib2IucmlnaHRAZXhhbXBsZS5jb20ifQ.hh9mmR18hInXSnQByLGQY0d4v5l64Gbje_SoSEKE3AY',
        },
      };
      decodeToken(req, {}, () => {});
      expect(req.user).to.deep.equal({
        user_id: 5,
        username: 'bob right',
        exp: 1559311495,
        email: 'bob.right@example.com',
      });
    });

    it('should pass the error if no cookies', (done) => {
      const nextMock = (err) => {
        expect(err.message).to.equal('Cookie are required to decode token');
        done();
      };
      decodeToken({}, {}, nextMock);
    });

    it('should not error if missing token', () => {
      const req = {
        cookies: {},
      };
      decodeToken(req, {}, () => {});
      expect(req.user).to.equal(null);
    });

    it('should not error if invalid token', () => {
      const req = {
        cookies: {
          token: 'Not the token you are looking for',
        },
      };
      decodeToken(req, {}, () => {});
      expect(req.user).to.equal(null);
    });
  });


  describe('.checkAppPermision', () => {
    it('should call next if user exist', (done) => {
      const req = {
        user: { email: 'abc.example.com' },
      };
      const nextMock = (data) => {
        expect(typeof data).to.equal('undefined');
        done();
      };
      checkAppPermision({})(req, {}, nextMock);
    });

    it('should redirect if user do not exist', (done) => {
      const req = { user: null };
      const res = {
        redirect: (url) => {
          expect(url).to.equal('/login');
          done();
        },
      };
      checkAppPermision({ redirect: '/login' })(req, res, () => {});
    });
  });

  describe('./isUserAlreadyLoggedin', () => {
    it('should keep to login if user do not exist', (done) => {
      const req = { user: null };
      const nextMock = (data) => {
        expect(typeof data).to.equal('undefined');
        done();
      };
      isUserAlreadyLoggedin()(req, {}, nextMock);
    });

    it('should redirect to app if user is already logued-in', (done) => {
      const req = {
        user: { email: 'abc.example.com' },
      };
      const res = {
        redirect: (url) => {
          expect(url).to.equal('/app');
          done();
        },
      };
      isUserAlreadyLoggedin({ redirect: '/app' })(req, res, () => {});
    });
  });
});
