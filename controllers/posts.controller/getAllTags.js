import ctrlWrapper from '../../decorators/controllerWrapper.js';
import Post from '../../models/post.model.js';

// @description - GET ALL TAGS
// @route       - GET /api/posts/tags

const getAllTags = ctrlWrapper(async (req, res) => {
  // Query retrieves only the tags that are actually used in posts. Any tags from TAGS_ENUM that are not assigned to any post will not appear in the result of the distinct query. Therefore, tags that have not been used in any post are not shown in the response.
  const tags = await Post.distinct('tags');

  res.json({ data: { tags } });
});

export default getAllTags;
