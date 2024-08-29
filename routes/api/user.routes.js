import { Router } from 'express';

import getUsersCtrl from '../../controllers/user.controller/getUsers.js';
import getUserInfoCtrl from '../../controllers/user.controller/getUserInfo.js';
import followUnfollowUserCtrl from '../../controllers/user.controller/followUnfollowUser.js';

import protectRoute from '../../middlewares/protectRoute.js';

const router = Router();

router.get('/', protectRoute, getUsersCtrl);
router.get('/:id', protectRoute, getUserInfoCtrl);
router.post('/follow/:id', protectRoute, followUnfollowUserCtrl);

export default router;
