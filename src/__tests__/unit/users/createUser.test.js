import supertest from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
const request = supertest(app);

const userId = new mongoose.Types.ObjectId();

describe('User', () => {
  it('should be able to create user', async () => {
    const res = await request.post('/api/users').send({
      firstname: 'myfirstname',
      lastname: 'mylastname',
      email: 'myuseremail@email.com',
      mobile: '07027273892',
      password: '321321',
    });

    expect(res.status).toBe(201);
  });
});
