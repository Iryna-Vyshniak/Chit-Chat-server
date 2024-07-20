import ctrlWrapper from '../../decorators/controllerWrapper.js';
import HttpError from '../../helpers/HttpError.js';

import Post from '../../models/post.model.js';


// @description - GET ONE POST AND UPDATE VIEWS
// @route       - GET /api/posts/:id

const getPost = ctrlWrapper(async (req, res) => {
    const postId = req.params.id;
    
  // Checking for a post without updating
  const postExists = await Post.findById(postId);

  if (!postExists) {
    throw HttpError(404, 'Not Found Post');
  }

  // Update viewsCount and get the post
  const post = await Post.findOneAndUpdate(
    { _id: postId },
    { $inc: { viewsCount: 1 } },
    { new: true }
  ).populate('owner', '_id username fullName avatar email');

  res.json({ data: { post } });
});

export default getPost;
