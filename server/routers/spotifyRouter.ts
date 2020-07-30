import express = require('express');
import authRouter from './authRouter';
import spotifyController = require('../controllers/spotifyController');

const router = express.Router();

router.use('/auth', authRouter);

router.get('/user', spotifyController.getUserData);

router.get('/top', spotifyController.getTopOfUser);
export = router;
