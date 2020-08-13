import express from 'express';

import {
  checkTracksStatus,
  getDevices,
  getPlaybackState,
  pause,
  play,
  previous,
  next,
  removeTracks,
  saveTracks,
  seek,
  setDevice,
  setVolume,
} from '../controllers/playerController';

const router = express.Router();

router.get('/checkTrackStatus', checkTracksStatus);
router.get;

export = router;
