const server = require('../src/server');
const supertest = require('supertest');

describe('server', () => {
  it('should turn on the server', () => {
    return supertest(server).get('/login').then((res) => {
      console.log(res.body);
      console.log(res.headers);
    });
  });

  it('should return to login if no token available', () => {

  });

  it('should return to login if token is expired', () => {

  });

  it('should return to login if token is invalid', () => {

  });

  describe('Valid token', () => {
    it('should redirect to proper app', () => {
      return supertest(server)
        .get('/login')
        .then((res) => {
        console.log(res.body);
        console.log(res.headers);
      });
    });
  })
})
