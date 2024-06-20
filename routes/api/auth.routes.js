import { Router } from 'express';

import signupCtrl  from '../../controllers/auth.controller/signup.js';
import signinCtrl from '../../controllers/auth.controller/signin.js';
import logoutCtrl from '../../controllers/auth.controller/logout.js';

import validateBody from '../../decorators/validateBody.js';
import { userSignupSchema, userSigninSchema } from '../../schema/user.schema.js';

const router = Router();

router.post('/signup', validateBody(userSignupSchema), signupCtrl);

router.post('/signin', validateBody(userSigninSchema), signinCtrl); 

router.post('/logout', logoutCtrl)

export default router;