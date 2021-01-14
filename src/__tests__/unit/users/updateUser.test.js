import supertest from 'supertest';
import app from '../../app';
import UserModel from '../../model/user.model';
const request = supertest(app);

const user = new UserModel({
  firstname: 'existsmyfirstname',
  lastname: 'existsmylastname',
  email: 'existsmyuseremail@email.com',
  mobile: '07027273892',
  password: '321321',
});

user.save();

describe('User', () => {
  it('should be able to update a user', async () => {
    const updateUser = new UserModel({
      firstname: 'existsmyfirstname',
      lastname: 'existsmylastname',
      email: 'existsmyuseremail@email.com',
      mobile: '07027273892',
      password: '321321',
    });

    await updateUser.save();

    const res = await request.patch('/api/user').send({
      id: user._id,
    });

    expect(res.status).toBe(200);
  });
});
