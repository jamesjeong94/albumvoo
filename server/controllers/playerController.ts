import { IPlayOptions } from '../types/playerTypes';
import { Response, Request } from 'express';
import axios from 'axios';

const handleExpiredToken = (req: Request, res: Response) => {
  res.sendStatus(401);
};

const playerController = {
  checkTracksStatus: async (req: Request, res: Response) => {
    const tracks = req.query.tracks;
    const token = req.query.token;
    const ids = Array.isArray(tracks) ? tracks : [tracks];
    return axios({
      url: `https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then((data) => res.send(data))
      .catch((err) => {
        console.log(err);
        handleExpiredToken(req, res);
      });
  },

  getDevices: async (req: Request, res: Response) => {
    const token = req.query.token;
    return axios({
      url: `https://api.spotify.com/v1/me/player/devices`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then(({ data }) => {
        console.log('sending back devices');
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        handleExpiredToken(req, res);
      });
  },

  getPlaybackState: async (req: Request, res: Response) => {
    const token = req.query.token;
    return axios({
      url: `https://api.spotify.com/v1/me/player`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'GET',
    })
      .then(({ data }) => {
        if (data.status === 204) {
          res.send();
        }
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        handleExpiredToken(req, res);
      });
  },
  pause: async (req: Request, res: Response) => {
    const token = req.query.token;
    return axios({
      url: `https://api.spotify.com/v1/me/player/pause`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    })
      .then(({ data }) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        handleExpiredToken(req, res);
      });
  },

  play: async (req: Request, res: Response) => {
    const { context_uri, deviceId, uris } = req.body.options;
    const offset = req.body.options.offset ? req.body.options.offset : 0;
    const position_ms = req.body.options.position_ms ? req.body.options.position_ms : 0;
    const token = req.query.token;
    let body: any;
    if (context_uri) {
      const isArtist = context_uri.indexOf('artist') >= 0;
      let position;

      if (!isArtist) {
        position = { position: offset };
      }

      body = JSON.stringify({ context_uri, offset: position, position_ms });
    } else if (Array.isArray(uris) && uris.length) {
      body = JSON.stringify({ uris, offset: { position: offset }, position_ms });
    }

    return axios({
      url: `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    })
      .then(({ data }) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        handleExpiredToken(req, res);
      });
  },
  previous: async (req: Request, res: Response) => {
    const token = req.query.token;
    return axios({
      url: `https://api.spotify.com/v1/me/player/previous`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(({ data }) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        handleExpiredToken(req, res);
      });
  },
  next: async (req: Request, res: Response) => {
    const token = req.query.token;
    return axios({
      url: `https://api.spotify.com/v1/me/player/next`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(({ data }) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        handleExpiredToken(req, res);
      });
  },
  removeTracks: async (req: Request, res: Response) => {
    const { tracks } = req.body;
    const ids = Array.isArray(tracks) ? tracks : [tracks];
    const token = req.query.token;
    return axios({
      url: `https://api.spotify.com/v1/me/tracks`,
      data: JSON.stringify(ids),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    })
      .then(({ data }) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        handleExpiredToken(req, res);
      });
  },
  saveTracks: async (req: Request, res: Response) => {
    const { tracks } = req.body;
    const ids = Array.isArray(tracks) ? tracks : [tracks];
    const token = req.query.token;
    return axios({
      url: `https://api.spotify.com/v1/me/tracks`,
      data: JSON.stringify({ ids }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    })
      .then(({ data }) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        handleExpiredToken(req, res);
      });
  },

  seek: async (req: Request, res: Response) => {
    const { position } = req.body;
    const token = req.query.token;
    return axios({
      url: `https://api.spotify.com/v1/me/player/seek?position_ms=${position}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    })
      .then(({ data }) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        handleExpiredToken(req, res);
      });
  },
  setDevice: async (req: Request, res: Response) => {
    const { deviceId } = req.body;
    const token = req.query.token;
    return axios({
      url: `https://api.spotify.com/v1/me/player`,
      data: JSON.stringify({ device_ids: [deviceId], play: true }),
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    })
      .then(({ data }) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        handleExpiredToken(req, res);
      });
  },
  setVolume: async (req: Request, res: Response) => {
    const { volume } = req.body;
    const token = req.query.token;
    return axios({
      url: `https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      method: 'PUT',
    })
      .then(({ data }) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.log(err);
        handleExpiredToken(req, res);
      });
  },
};

export = playerController;
