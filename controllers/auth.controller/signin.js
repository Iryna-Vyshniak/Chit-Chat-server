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

  const user = await User.findOne({ email }).select('+password');
  // We use select('+password') to explicitly include the password field when searching for a user. This is necessary because by default, if the schema has a select: false option for the password, it will not be loaded.

  const isCorrectPassword = await bcrypt.compare(password, user?.password || '');

  if (!user || !isCorrectPassword) {
    throw HttpError(400, 'Email or password incorrect');
  }

  generateTokenAndSetCookie(user._id, res);

  // remove the password from the object before sending it back. This does not change the data in the database, but only excludes the password from the object passed to the client.
  user.password = null;

  res.status(200).json({
    data: { user },
  });
});

export default signin;
