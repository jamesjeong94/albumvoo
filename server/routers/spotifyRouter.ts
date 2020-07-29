import express = require('express');
import matchesController = require('../controllers/spotifyController');

const router = express.Router();

router.get('/', matchesController.getMatches);

export = router;
