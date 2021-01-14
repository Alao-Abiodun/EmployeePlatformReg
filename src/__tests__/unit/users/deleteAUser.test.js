import supertest from 'supertest';
import app from '../../app';
import UserModel from '../../model/user.model';
import mongoose from 'mongoose';
const request = supertest(app);

const userId = new mongoose.Types.ObjectId();

describe('User', () => {
  it('should be able to delete user', async () => {
    const user = new UserModel({
      firstname: 'existsmyfirstname',
      lastname: 'existsmylastname',
      email: 'existsmyuseremail@email.com',
      mobile: '07027273892',
      password: '321321',
    });

    await user.save();

    const res = await request.delete('/api/user').send({
      id: user._id,
    });

    expect(res.status).toBe(200);
  });
});
