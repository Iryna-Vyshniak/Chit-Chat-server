import ctrlWrapper from '../../decorators/controllerWrapper.js';
import HttpError from '../../helpers/HttpError.js';
import Post from '../../models/post.model.js';
import { pagination } from '../../utils/pagination.js';

// @description - GET ALL POSTS BY TAG
// @route       - GET /api/posts/tags/:tag

const getPostsByTag = ctrlWrapper(async (req, res) => {
  const { page: currentPage, limit: currentLimit } = req.query;

  const { page, limit, skip } = pagination(currentPage, currentLimit);

  const { tag } = req.params;

  const posts = await Post.find({ tags: { $in: [tag] } }, '', { skip, limit }).sort('createdAt');

  if (!posts.length) {
    throw HttpError(404, 'No posts found with the specified tag');
  }

  const totalPosts = await Post.countDocuments({ tags: { $in: [tag] } });

  res.json({
    posts,
    totalPosts,
    totalPages: Math.ceil(totalPosts / limit),
    currentPage: page,
    limit,
  });
});

export default getPostsByTag;
