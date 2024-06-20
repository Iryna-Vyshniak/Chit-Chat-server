import bcrypt from 'bcryptjs';

import User from '../../models/user.model.js';

import HttpError  from '../../helpers/HttpError.js';
import ctrlWrapper  from '../../decorators/controllerWrapper.js';
import generateTokenAndSetCookie from '../../utils/generateToken.js';
import connectToMongoDB from '../../db/connectToMongoDB.js';

// @description - SIGNUP
// @route         POST /api/auth/signup

const signup = ctrlWrapper(async (req, res) => {
  await connectToMongoDB();

  const { username, password, confirmPassword, gender } = req.body;

  if (password !== confirmPassword) {
    throw HttpError(400, 'Passwords don`t match');
  }

  const userExists = await User.findOne({ username });

  if (userExists) {
    throw HttpError(409, 'Username already exists');
  }

  //   hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  //   avatar
  const manAvatar =
    'https://res.cloudinary.com/dkqxaid79/image/upload/v1711450156/rewievs/man-emoji.png';
  const womanAvatar =
    'https://res.cloudinary.com/dkqxaid79/image/upload/v1711450156/rewievs/female-emoji.png';

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatar: gender === 'female' ? womanAvatar : manAvatar, 
  });
  
  if (!newUser) {
    throw HttpError(400, 'Invalid user data');
  }

  // generate token and set cookies
  generateTokenAndSetCookie(newUser._id, res);

  res.status(201).json({
    data: {
      user: {
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        avatar: newUser.avatar,
        email: newUser.email,
        gender: newUser.gender,
      }
    }
  });
});

export default signup;