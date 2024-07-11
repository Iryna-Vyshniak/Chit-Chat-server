import { Router } from 'express';

import protectRoute from '../../middlewares/protectRoute.js';

import createPostCtrl from '../../controllers/posts.controller/createPost.js';
import getPostsCtrl from '../../controllers/posts.controller/getPosts.js';

const router = Router();

// private
router.get('/', protectRoute, getPostsCtrl);
router.post('/create', protectRoute, createPostCtrl);

export default router;
