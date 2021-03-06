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

  async getAllUsers(req, res) {
    try {
      const allUser = await User.find({});
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'All User Retrieved',
          numOfUsers: allUser.length,
          allUser,
        },
      });
    } catch (err) {
      console.log(error);
      return res.status(500).json({
        status: error,
        data: {
          message: 'Server Error',
        },
      });
    }
  }

  async getASingleUser(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findOne({ _id: id });
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'A user is retrieved',
          user,
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

  async updateAUser(req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = [
      'firstname',
      'lastname',
      'email',
      'mobile',
      'password',
    ];
    const isValidUpdate = updates.every(update =>
      allowedUpdates.includes(update)
    );
    if (!isValidUpdate) {
      return res.status(400).json({ message: 'Invalid updates field' });
    }
    try {
      const { id } = req.params;
      const updatedUser = await User.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'User updated successfully',
          updatedUser,
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

  async removeAUser(req, res) {
    try {
      const { id } = req.params;
      const removedUser = await User.findOneAndDelete({ _id: id });
      const config = {
        subject: 'This User has been removed from the application',
        to: removedUser.email,
        html: `<h1>Login Details</h1>
        <p>email ${removedUser.email}</p>
        <p>password: ${removedUser.password}</p>`,
      };
      await sendMail(config);
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'User deleted',
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
