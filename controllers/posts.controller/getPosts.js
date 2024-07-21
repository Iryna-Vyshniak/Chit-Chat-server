// @description - GET ALL POSTS
// @route       - GET /api/posts

import ctrlWrapper from '../../decorators/controllerWrapper.js';

import Post from '../../models/post.model.js';
import { pagination } from '../../utils/pagination.js';

const getPosts = ctrlWrapper(async (req, res) => {
  const { page: currentPage, limit: currentLimit } = req.query;

  const { page, limit, skip } = pagination(currentPage, currentLimit);

  const allPosts = await Post.find({}, '', { skip, limit })
    .populate('owner', '_id fullName username avatar')
    .sort('-createdAt');

  if (!allPosts.length) {
    return res.status(200).json({ message: 'There are no posts yet', posts: [] });
  }

  const popularPosts = await Post.find({}, '', { skip, limit })
    .sort('-viewsCount')
    .populate('owner', '_id username fullName avatar');

  if (!popularPosts) {
    return res.status(200).json({ message: 'There are no posts yet', posts: [] });
  }

  const totalPosts = await Post.countDocuments();

  return res.status(200).json({
    data: {
      posts: allPosts,
      popularPosts,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      currentPage: page,
      limit,
    },
  });
});

export default getPosts;
