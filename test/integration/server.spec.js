const { expect } = require('chai');
const supertest = require('supertest');

const server = require('../../src/server');

// ex: {
// "user_id": 5,
// "username": "bob right",
// "exp": 1559311495,
// "email": "bob.right@example.com"
// }
// eslint-disable-next-line max-len
const baseToken = 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6ImJvYiByaWdodCIsImV4cCI6MTU1OTMxMTQ5NSwiZW1haWwiOiJib2IucmlnaHRAZXhhbXBsZS5jb20ifQ.hh9mmR18hInXSnQByLGQY0d4v5l64Gbje_SoSEKE3AY';
// Include extra > "app": "app2",
// eslint-disable-next-line max-len
const baseTokenWithApp2 = 'token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6ImJvYiByaWdodCIsImV4cCI6MTU1OTMxMTQ5NSwiYXBwIjoiYXBwMiIsImVtYWlsIjoiYm9iLnJpZ2h0QGV4YW1wbGUuY29tIn0.aXFJtDdcSnee9mm1QwoyFOyO5iv2U3klFYgjg9DoXGk';

describe('server', () => {
  it('should turn on the server', () => supertest(server).get('/login').then((res) => {
    expect(res.statusCode).to.equal(200);
  }));

  it('should return to login if no token available', () => supertest(server)
    .get('/app')
    .then((res) => {
      expect(res.statusCode).to.equal(302);
      expect(res.headers.location).to.equal('/login');
    }));

  it('should return to login if token is expired', () => {

  });

  it('should return to login if token is invalid', () => {

  });

  describe('Valid token', () => {
    it('should keep to app if token available', () => supertest(server)
      .get('/app')
      .set('cookie', baseToken)
      .then((res) => {
        expect(res.statusCode).to.equal(200);
      }));

    it('should redirect to default app', () => supertest(server)
      .get('/login')
      .set('cookie', baseToken)
      .then((res) => {
        expect(res.statusCode).to.equal(302);
        expect(res.headers.location).to.equal('/');
      }));

    it('should redirect to custom app', () => supertest(server)
      .get('/app')
      .set('cookie', baseTokenWithApp2)
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.text).to.contain('This is app 2');
      }));
  });
});
