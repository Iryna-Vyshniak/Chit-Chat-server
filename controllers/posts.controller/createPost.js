import { v2 as cloudinary } from 'cloudinary';

import ctrlWrapper from '../../decorators/controllerWrapper.js';

import Post from '../../models/post.model.js';
import User from '../../models/user.model.js';

// @description - CREATE POST
// @route       - POST /api/posts/create

const createPost = ctrlWrapper(async (req, res) => {
  const { _id: owner } = req.user;
  const { imageUrl } = req.body;

  let imgUrl = '';

  if (imageUrl) {
    const uploadResponse = await cloudinary.uploader.upload(imageUrl, {
      folder: 'posts',
      public_id: `post_${owner}-${Date.now()}`,
      use_filename: true,
      fetch_format: 'auto',
      quality: 'auto',
      flags: 'lossy',
    });
    imgUrl = uploadResponse.secure_url;
  }

  const post = await Post.create({ ...req.body, owner, imageUrl: imgUrl });
  await User.findByIdAndUpdate(owner, { $push: { posts: post } }, { new: true });

  res.status(201).json(post);
});

export default createPost;
