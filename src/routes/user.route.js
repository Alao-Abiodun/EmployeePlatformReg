import express from 'express';

const router = express.Router();

import userCtrl from '../controllers/user.controller';

router.post('/user', userCtrl.signUp);
router.get('/users', userCtrl.getAllUsers);
router.get('/user/:id', userCtrl.getASingleUser);
router.patch('/user/:id', userCtrl.updateAUser);
router.delete('/user/:id', userCtrl.removeAUser);
export default router;
