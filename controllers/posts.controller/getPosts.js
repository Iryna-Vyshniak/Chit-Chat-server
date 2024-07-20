// @description - GET ALL POSTS
// @route       - GET /api/posts

import ctrlWrapper from '../../decorators/controllerWrapper.js';

import Post from '../../models/post.model.js';

const getPosts = ctrlWrapper(async (req, res) => {
  const allPosts = await Post.find()
    .populate('owner', '_id fullName username avatar')
    .sort('-createdAt');

  if (!allPosts.length) {
    return res.status(200).json({ message: 'There are no posts yet', posts: [] });
  }

  const popularPosts = await Post.find()
    .sort('-viewsCount')
    .populate('owner', '_id username fullName avatar');

  if (!popularPosts) {
    return res.status(200).json({ message: 'There are no posts yet', posts: [] });
  }

  return res.status(200).json({
    data: {
      posts: allPosts,
      popularPosts,
    },
  });
});

export default getPosts;
