// @description - CREATE POST
// @route       - GET /api/posts

import connectToMongoDB from '../../db/connectToMongoDB.js';

import ctrlWrapper from '../../decorators/controllerWrapper.js';
import HttpError from '../../helpers/HttpError.js';

import Post from '../../models/post.model.js';

const getPosts = ctrlWrapper(async (req, res) => {
  await connectToMongoDB();

  const allPosts = await Post.find().populate('owner', '_id fullName avatar').sort('-createdAt');

  if (!allPosts) {
    throw HttpError(404, 'Not Found Posts');
  }

  return res.json({
    data: {
      posts: allPosts,
    },
  });
});

export default getPosts;
