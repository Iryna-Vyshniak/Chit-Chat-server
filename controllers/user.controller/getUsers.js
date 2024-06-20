import connectToMongoDB from '../../db/connectToMongoDB.js';
import ctrlWrapper from '../../decorators/controllerWrapper.js';

import User from '../../models/user.model.js';

// @description - GET USERS FOR SIDEBAR
// @route       - GET /api/users

const getUsers = ctrlWrapper(async (req, res) => {
  await connectToMongoDB();

  const loggedInUserId = req.user._id;

  // find all users but don`t find user who is logged in and can see all users (conversations) on sidebar because we don`t want to send message to us
  const allFilteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password');

  if (!allFilteredUsers.length) {
    return res.status(200).json({
      message: 'There are no users yet',
      users: [],
    });
  }

  res.status(200).json({ data: { users: allFilteredUsers } });
});

export default getUsers;
