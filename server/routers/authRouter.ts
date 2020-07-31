import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import qs from 'qs';

dotenv.config();

const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const HOST = process.env.HOST;

const redirect_uri: string = `${HOST}/spotify/auth/redirect`;

router.get('/login', (req, res) => {
  var scopes = 'user-read-private user-read-email user-top-read';
  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      CLIENT_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent(redirect_uri)
  );
});

router.get('/redirect', (req, res) => {
  const code: any = req.query.code;
  axios({
    method: 'POST',
    url: `https://accounts.spotify.com/api/token`,
    data: qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri,
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
    },
  })
    .then(({ data }) => {
      res
        .cookie('access_token', data.access_token, {
          maxAge: data.expires_in,
        })
        .cookie('refresh_token', data.refresh_token, {
          maxAge: data.expires_in,
        })
        .redirect(`${HOST}/main`);
    })
    .catch((err) => {
      // console.log(err);
      res.redirect(`${HOST}/spotify/authlogin`);
    });
});

export = router;
