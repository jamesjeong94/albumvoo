import axios from 'axios';

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
      .catch(handleError);
  },
  getPlaylists: (req: any, res: any) => {
    return axios({});
  },
  getTopOfUser: (req: any, res: any) => {
    let type = req.query.type;
    console.log(req.query.type);
    return axios({
      method: 'get',
      url: `https://api.spotify.com/v1/me/top/${type}`,
      headers: generateAuthHeader({}, req.cookies),
    })
      .then(({ data }) => {
        res.send(data);
      })
      .catch(handleError);
  },
};
