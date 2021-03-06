import express from 'express';

import authController from '../controllers/authController';

const router = express.Router();

router.get('/login', authController.loginUser);

router.get('/redirect', authController.redirectUser);

router.get('/refresh', authController.refreshToken);

export = router;
