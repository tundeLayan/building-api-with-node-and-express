import supertest from "supertest";
const app = require('../server');


describe('GET /', ()=>{
  it('should send back some data', async ()=>{
    const res = await supertest(app).get('/')

    expect(res.body.message).toBe('hello')
  })
})