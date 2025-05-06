import request from 'supertest';
import app from '../src/index';

let token: string;

beforeAll(async () => {
  const loginRes = await request(app).post('/auth/login').send({
    email: 'test@example.com',
    password: 'password123'
  });
  token = loginRes.body.accessToken;
});

describe('Task API', () => {
  it('should create a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task', description: 'Test description' });

    expect(res.statusCode).toBe(201);
    expect(res.body.task).toHaveProperty('title', 'Test Task');
  });
});
