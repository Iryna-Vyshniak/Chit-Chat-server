import connectToMongoDB from '../../db/connectToMongoDB.js';
import ctrlWrapper from '../../decorators/controllerWrapper.js';
import User from '../../models/user.model.js';

// @description - POST USER FOLLOWER OR UNFOLLOWING
// @route       - GET /api/users/follow/:id

const followUnfollowUser = ctrlWrapper(async (req, res) => {
  await connectToMongoDB();

  const { id } = req.params;
  const userId = req.user._id;
  const userToModify = await User.findById(id);
  const currentUser = await User.findById(userId);

  if (!userToModify || !currentUser) return res.status(400).json({ error: 'User not found' });

  if (id === userId.toString()) {
    return res.status(400).json({ error: 'You cannot follow or unfollow youself' });
  }

  const isFollowing = currentUser.followings.includes(id);

  if (isFollowing) {
    // unfollow
    await User.updateOne({ _id: userId }, { $pull: { followings: id } }); // modify current user
    await User.updateOne({ _id: id }, { $pull: { followers: userId } }); // modify follower user
    res.status(200).json({ message: 'User unfollowed successfully' });
  } else {
    //   follow
    await User.updateOne({ _id: userId }, { $push: { followings: id } });
    await User.updateOne({ _id: id }, { $push: { followers: userId } });
    res.status(200).json({ message: 'User followed successfully' });
  }
});

export default followUnfollowUser;
