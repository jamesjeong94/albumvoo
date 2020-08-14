import axios from 'axios';
import { IPlayOptions } from './types/spotify';

const HOST = `${process.env.HOST}/spotify/player`;

const playerAPI = {
  checkTracksStatus: async (tracks: string | string[], token: string) => {
    return axios({
      method: 'get',
      params: {
        tracks,
        token,
      },
      url: `${HOST}/checkTrackStatus`,
    });
  },
  getDevices: async (token: string) => {
    return axios({
      method: 'get',
      params: {
        token,
      },
      url: `${HOST}/getDevices`,
    }).then(({ data }) => {
      console.log(data);
      return data;
    });
  },
  getPlaybackState: async (token: string) => {
    return axios({
      method: 'get',
      params: {
        token,
      },
      url: `${HOST}/getPlaybackState`,
    });
  },
  pause: async (token: string) => {
    return axios({
      method: 'put',
      params: {
        token,
      },
      url: `${HOST}/pause`,
    });
  },
  play: async (
    { context_uri, deviceId, offset = 0, uris, position_ms = 0 }: IPlayOptions,
    token: string
  ) => {
    return axios({
      method: 'put',
      params: {
        token,
      },
      data: {
        options: {
          context_uri,
          deviceId,
          offset,
          uris,
          position_ms,
        },
      },
      url: `${HOST}/play`,
    });
  },
  previous: async (token: string) => {
    return axios({
      method: 'POST',
      params: {
        token,
      },
      url: `${HOST}/previous`,
    });
  },
  next: async (token: string) => {
    return axios({
      method: 'POST',
      params: {
        token,
      },
      url: `${HOST}/next`,
    });
  },
  removeTracks: async (tracks: string | string[], token: string) => {
    return axios({
      method: 'DELETE',
      params: {
        token,
      },
      data: { tracks },
      url: `${HOST}/removeTracks`,
    });
  },
  saveTracks: async (tracks: string | string[], token: string) => {
    return axios({
      method: 'PUT',
      params: {
        token,
      },
      data: { tracks },
      url: `${HOST}/saveTracks`,
    });
  },
  seek: async (position: number, token: string) => {
    return axios({
      method: 'PUT',
      params: {
        token,
      },
      data: { position },
      url: `${HOST}/seek`,
    });
  },
  setDevice: async (deviceId: string, token: string) => {
    return axios({
      method: 'PUT',
      params: {
        token,
      },
      data: { deviceId },
      url: `${HOST}/setDevice`,
    });
  },
  setVolume: async (volume: number, token: string) => {
    return axios({
      method: 'PUT',
      params: {
        token,
      },
      data: { volume },
      url: `${HOST}/setVolume`,
    });
  },
};

export = playerAPI;
