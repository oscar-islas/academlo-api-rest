import express from 'express';
import userController from '../controllers/user';

const router = express.Router();

router.get('/users', userController.getUsers);

router.post('/reset-password', userController.resetPassword);

export default router;