import { Router } from 'express';

import protectRoute from '../../middlewares/protectRoute.js';

import createPostCtrl from '../../controllers/posts.controller/createPost.js';

const router = Router();

// private
router.post('/create', protectRoute, createPostCtrl);

export default router;
