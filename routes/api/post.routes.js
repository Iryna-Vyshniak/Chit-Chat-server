import { Router } from 'express';

import protectRoute from '../../middlewares/protectRoute.js';

import createPostCtrl from '../../controllers/posts.controller/createPost.js';
import getPostsCtrl from '../../controllers/posts.controller/getPosts.js';
import getPostCtrl from '../../controllers/posts.controller/getPost.js';

const router = Router();

// private
router.get('/', protectRoute, getPostsCtrl);
router.get('/:id', protectRoute, getPostCtrl);
router.post('/create', protectRoute, createPostCtrl);

export default router;
