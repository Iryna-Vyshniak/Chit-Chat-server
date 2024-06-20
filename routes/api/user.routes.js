import { Router } from 'express';

import getUsersCtrl  from '../../controllers/user.controller/getUsers.js';

import protectRoute from '../../middlewares/protectRoute.js';

const router = Router();

router.get('/', protectRoute, getUsersCtrl);

export default router;