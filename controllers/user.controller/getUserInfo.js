import connectToMongoDB from '../../db/connectToMongoDB.js';
import ctrlWrapper from '../../decorators/controllerWrapper.js';
import HttpError from '../../helpers/HttpError.js';

import User from '../../models/user.model.js';

// @description - GET USER INFO
// @route       - GET /api/users/:id

const getUserInfo = ctrlWrapper(async (req, res) => {
  await connectToMongoDB();

  const { id } = req.params;

  const user = await User.findById({ _id: id }).select('-password');

  if (!user) throw HttpError(404, 'User not found');

  res.status(200).json({ data: { user } });
});

export default getUserInfo;
