import User from '../model/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();
const { sendMail } = require('../helpers/mailer');

const { JWT_SECRET } = process.env;

class UserController {
  async signUp(req, res) {
    const { firstname, lastname, email, mobile, password } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({
          message: 'User already exist, please signIn.',
        });
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const user = new User({
        firstname,
        lastname,
        email,
        mobile,
        password: hashPassword,
      });
      const config = {
        subject: 'Login details',
        to: email,
        html: `<h1>Login Details</h1>
        <p>email ${email}</p>
        <p>password: ${password}</p>`,
      };
      await sendMail(config);
      const createdUser = await user.save();
      const token = await jwt.sign({ id: createdUser._id }, JWT_SECRET, {
        expiresIn: '2h',
      });
      return res.status(201).json({
        status: 'success',
        data: {
          message: 'User successfully created',
          token,
          userId: createdUser._id,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: error,
        data: {
          message: 'Server Error',
        },
      });
    }
  }
}

export default new UserController();