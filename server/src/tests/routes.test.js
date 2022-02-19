const request = require('supertest')
const app = require('../index')
describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({
        firstName: 'Jim',
        lastName: 'Carey',
        username: 'jimmyboi123',
        password: 'PurpleApricot581'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('username')
  })
})
