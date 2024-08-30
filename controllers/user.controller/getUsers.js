import connectToMongoDB from '../../db/connectToMongoDB.js';
import ctrlWrapper from '../../decorators/controllerWrapper.js';

import User from '../../models/user.model.js';

// @description - GET USERS FOR SIDEBAR
// @route       - GET /api/users

const getUsers = ctrlWrapper(async (req, res) => {
  await connectToMongoDB();

  const loggedInUserId = req.user._id;

  // find all users and filter out the logged-in user
  const allUsers = await User.find().select('-password');

  if (!allUsers.length) {
    return res.status(200).json({
      message: 'There are no users yet',
      users: [],
    });
  }

  // filter out the logged-in user
  const filteredUsers = allUsers.filter(
    (user) => user._id.toString() !== loggedInUserId.toString()
  );

  res.status(200).json({ data: { filteredUsers, allUsers } });
});

export default getUsers;
