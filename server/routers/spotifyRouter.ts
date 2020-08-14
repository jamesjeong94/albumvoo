import express = require('express');
import authRouter from './authRouter';
import playerRouter from './playerRouter';
import spotifyController = require('../controllers/spotifyController');

const router = express.Router();

//routers
router.use('/auth', authRouter);
router.use('/player', playerRouter);

router.get('/user', spotifyController.getUserData);

router.get('/top', spotifyController.getTopOfUser);

router.get('/recent', spotifyController.getRecentByTopArtists);

router.get('/albumsongs', spotifyController.getAlbumSongs);

export = router;
