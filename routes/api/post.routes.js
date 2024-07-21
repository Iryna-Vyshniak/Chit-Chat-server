import { Router } from 'express';

import protectRoute from '../../middlewares/protectRoute.js';

import createPostCtrl from '../../controllers/posts.controller/createPost.js';
import getPostsCtrl from '../../controllers/posts.controller/getPosts.js';
import getPostCtrl from '../../controllers/posts.controller/getPost.js';
import getAllTagsCtrl from '../../controllers/posts.controller/getAllTags.js';
import getPostsByTagCtrl from '../../controllers/posts.controller/getPostsByTag.js';

const router = Router();

// private
router.get('/', protectRoute, getPostsCtrl);
router.get('/tags', protectRoute, getAllTagsCtrl);
router.get('/tags/:tag', protectRoute, getPostsByTagCtrl);
router.post('/create', protectRoute, createPostCtrl);
router.get('/:id', protectRoute, getPostCtrl);

export default router;
