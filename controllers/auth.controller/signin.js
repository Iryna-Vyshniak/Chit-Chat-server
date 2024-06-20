import bcrypt from 'bcryptjs';

import User from '../../models/user.model.js';

import HttpError from '../../helpers/HttpError.js';
import ctrlWrapper from '../../decorators/controllerWrapper.js';
import generateTokenAndSetCookie from '../../utils/generateToken.js';
import connectToMongoDB from '../../db/connectToMongoDB.js';

// @description - SIGNIN
// @route         POST /api/auth/signin

const signin = ctrlWrapper(async (req, res) => {
  await connectToMongoDB();

  const { email, password } = req.body;

  if (!email || !password) {
    throw new HttpError(400, 'Email and password are required');
  }

  const user = await User.findOne({ email });

  const isCorrectPassword = await bcrypt.compare(password, user?.password || '');

  if (!user || !isCorrectPassword) {
    throw HttpError(400, 'Email or password incorrect');
  }

  generateTokenAndSetCookie(user._id, res);

  res.status(200).json({
    data: {
        user: {
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            avatar: user.avatar,
            email: user.email,
            gender: user.gender,
            phone: user.phone,
            birthday: user.birthday,
          },
    }
  });
});

export default signin;
