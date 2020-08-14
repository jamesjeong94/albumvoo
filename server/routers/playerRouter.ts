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
router.get('/getDevices', getDevices);
router.get('/getPlaybackState', getPlaybackState);
router.put('/pause', pause);
router.put('/play', play);
router.post('/previous', previous);
router.post('/next', next);
router.delete('/delete', removeTracks);
router.put('/saveTracks', saveTracks);
router.put('/seek', seek);
router.put('/setDevice', setDevice);
router.put('/setVolume', setVolume);

export = router;
