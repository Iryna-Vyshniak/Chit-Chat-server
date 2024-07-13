// @description - GET POSTS
// @route       - GET /api/posts

import connectToMongoDB from '../../db/connectToMongoDB.js';

import ctrlWrapper from '../../decorators/controllerWrapper.js';

import Post from '../../models/post.model.js';

const getPosts = ctrlWrapper(async (req, res) => {
  await connectToMongoDB();

  const allPosts = await Post.find().populate('owner', '_id fullName avatar').sort('-createdAt');
  console.log('allPosts: ', allPosts);

  if (!allPosts.length) {
    return res.status(200).json({ message: 'There are no posts yet', posts: [] });
  }

  return res.status(200).json({
    data: {
      posts: allPosts,
    },
  });
});

export default getPosts;
