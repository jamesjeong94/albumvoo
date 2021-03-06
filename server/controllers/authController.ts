import axios from 'axios';
import dotenv from 'dotenv';
import qs from 'qs';

dotenv.config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const HOST = process.env.HOST;

const redirect_uri: string = `${HOST}/spotify/auth/redirect`;
const scopes =
  'user-read-private user-read-email user-top-read user-library-read user-library-modify streaming user-read-playback-state user-modify-playback-state';
export = {
  loginUser: (req: any, res: any) => {
    res.redirect(
      'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        CLIENT_ID +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirect_uri)
    );
  },
  redirectUser: (req: any, res: any) => {
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
          'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      },
    })
      .then(({ data }) => {
        res
          .cookie('access_token', data.access_token, {
            maxAge: data.expires_in * 1000,
            sameSite: true,
          })
          .cookie('refresh_token', data.refresh_token, { sameSite: true })
          .redirect(`${HOST}/main`);
      })
      .catch((err) => {
        console.log('err in redirect');
        res.redirect(`${HOST}/spotify/auth/login`);
      });
  },
  refreshToken: (req: any, res: any) => {
    const code: any = req.query.code;

    axios({
      method: 'POST',
      url: `https://accounts.spotify.com/api/token`,
      data: qs.stringify({
        grant_type: 'refresh_token',
        refresh_token: req.cookies.refresh_token,
        redirect_uri: redirect_uri,
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
      },
    })
      .then(({ data }) => {
        console.log(data);
        res
          .cookie('access_token', data.access_token, {
            maxAge: data.expires_in * 1000,
            sameSite: true,
          })
          .redirect(`${HOST}/main`);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
