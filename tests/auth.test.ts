import request from 'supertest';
import app from '../src/index'; // Your Express app
import db from '../src/database/models';

describe('Auth Integration Tests', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true }); // clean test DB
  });

  it('should register a user', async () => {
    const res = await request(app).post('/auth/register').send({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toHaveProperty('email', 'test@example.com');
    expect(res.body).toHaveProperty('token');
  });

  it('should login the user', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'test@example.com',
      password: 'password123'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('accessToken');
  });
});
