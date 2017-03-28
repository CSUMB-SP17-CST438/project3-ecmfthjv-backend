const request = require('supertest');
var Server;

//Start server before each test
beforeAll(() => {
  Server = require('../server');
});
//Close server after each test
afterAll(() => {
  Server.close();
  setTimeout(() => process.exit(), 1000);
});

describe('Server test 1', function() {
  it('Access root /', function() {
    return request(Server)
      .get('/api')
      .expect(200)
  });
});

describe('Server test 2', function() {
  it('Access wrong route', function() {
    return request(Server)
      .get('/foo/bar')
      .expect(404)
  });
});
