import bcrypt from 'bcryptjs';

import User from '../../models/user.model.js';

import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../decorators/controllerWrapper.js';
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

  //   avatar and cover
  const manAvatar =
    'https://res.cloudinary.com/dkqxaid79/image/upload/v1711450156/rewievs/man-emoji.png';
  const womanAvatar =
    'https://res.cloudinary.com/dkqxaid79/image/upload/v1711450156/rewievs/female-emoji.png';
  const userCover =
    'https://res.cloudinary.com/dkqxaid79/image/upload/v1724506911/chat/cover-profile.jpg';

  // Create new user
  let newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatar: gender === 'female' ? womanAvatar : manAvatar,
    cover: userCover,
  });

  if (!newUser) {
    res.status(400).json({ error: 'Invalid user data' });
  } else {
    // Generate token and set cookies
    generateTokenAndSetCookie(newUser._id, res);

    // Remove password from the user object before sending the response
    newUser.password = null;
    res.status(201).json({
      data: {
        user: newUser, // Return the full user object
      },
    });
  }
});

export default signup;
