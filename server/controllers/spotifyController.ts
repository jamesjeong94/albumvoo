import axios from 'axios';

const HOST = process.env.HOST;

const generateAuthHeader = (header = {}, cookies: any) => {
  return { ...header, Authorization: `Bearer ${cookies.access_token}` };
};

const handleError = (err: any) => {
  console.log(err);
};

export = {
  getUserData: (req: any, res: any) => {
    return axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/me',
      headers: generateAuthHeader({}, req.cookies),
    })
      .then(({ data }) => {
        res.send(data);
      })
      .catch(() => {
        console.log('Need to reauth');
      });
  },
  getPlaylists: (req: any, res: any) => {
    return axios({});
  },
  getTopOfUser: (req: any, res: any) => {
    let type = req.query.type;
    return axios({
      method: 'get',
      url: `https://api.spotify.com/v1/me/top/${type}`,
      headers: generateAuthHeader({}, req.cookies),
    })
      .then(({ data }) => {
        res.send(data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          res.redirect(`${HOST}/spotify/auth/refresh`);
        }
        // res.redirect(`${HOST}/spotify/auth/login`);
      });
  },
  getRecentByTopArtists: (req: any, res: any) => {
    return axios({
      method: 'get',
      url: `https://api.spotify.com/v1/me/top/artists`,
      headers: generateAuthHeader({}, req.cookies),
    }).then(({ data }) => {
      const artists = data.items.map((artist: any) => {
        return { id: artist.id, name: artist.name };
      });
      res.send(artists);
    });
  },
};
