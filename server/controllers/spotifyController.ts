import axios from 'axios';
import { removeDuplicates, sortByDate } from '../util/spotifyControllerUtil';

const HOST = process.env.HOST;

const generateAuthHeader = (header = {}, cookies: any) => {
  return { ...header, Authorization: `Bearer ${cookies.access_token}` };
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
      });
  },
  getRecentByTopArtists: (req: any, res: any) => {
    return axios({
      method: 'get',
      url: `https://api.spotify.com/v1/me/top/artists`,
      headers: generateAuthHeader({}, req.cookies),
    }).then(({ data }) => {
      const artists = data.items.map((artist: any) => {
        let endPt = `https://api.spotify.com/v1/artists/${artist.id}/albums`;
        return axios({
          method: 'get',
          url: endPt,
          headers: generateAuthHeader({}, req.cookies),
        }).then(({ data }) => data.items);
      });
      return axios
        .all(artists)
        .then((data: any) => {
          let formattedData = data.reduce((acc: any[], curr: any[]) => {
            acc.push(...curr);
            return acc;
          }, []);
          formattedData = sortByDate(removeDuplicates(formattedData));
          res.send(formattedData);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  },
  getAlbumSongs: (req: any, res: any) => {
    let id = req.query.album_id;
    return axios({
      method: 'get',
      url: `https://api.spotify.com/v1/albums/${id}/tracks`,
      headers: generateAuthHeader({}, req.cookies),
    })
      .then(({ data }) => {
        let song_ids = data.items
          .reduce((acc: any, curr: any) => {
            acc.push(curr.id);
            return acc;
          }, [])
          .join(',');
        return axios({
          method: 'get',
          url: 'https://api.spotify.com/v1/me/tracks/contains',
          headers: generateAuthHeader({}, req.cookies),
          params: {
            ids: song_ids,
          },
        }).then((containsData) => {
          let combinedData = data.items.map((song: any, index: any) => {
            return { ...song, isSavedByUser: containsData.data[index] };
          });
          res.send(combinedData);
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          res.redirect(`${HOST}/spotify/auth/refresh`);
        }
      });
  },
};
