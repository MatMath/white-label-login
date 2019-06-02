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
        .set("cookie","token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo1LCJ1c2VybmFtZSI6Im1hdGhpZXUubGVnYXVsdEBjcmVtZWdsb2JhbC5jb20iLCJleHAiOjE1NTkzMTE0OTUsImVtYWlsIjoibWF0aGlldS5sZWdhdWx0QGNyZW1lZ2xvYmFsLmNvbSJ9.fJ9n-hdla8udLafTFX4JM5kAaZx1jEqU5iToP2N-z60")
        .then((res) => {
        console.log(res.body);
        console.log(res.headers);
      });
    });
  })
})
