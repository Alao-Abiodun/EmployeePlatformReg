import express from 'express';

const router = express.Router();

import userCtrl from '../controllers/user.controller';

router.post('/user', userCtrl.signUp);
export default router;
