import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { getCookieValue } from './util';

import Header from './components/Header/Header';
import SpotifyPlayerWrapper from './components/Player/SpotifyPlayerWrapper';
import AlbumPlayerWrapper from './components/AlbumPlayer/AlbumPlayerWrapper';
import StreamListWrapper from './components/Stream/StreamListWrapper';

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<Object>({ user: null });
  const [topArtists, setTopArtists] = useState<any[]>([]);
  const [recentAlbums, setRecentAlbums] = useState<any[]>([]);

  axios.interceptors.request.use((config) => {
    let access_token = getCookieValue('access_token');
    if (!access_token) {
      console.log('no access token');
    }
    return config;
  });

  // const getUserData = () => {
  //   axios({
  //     method: 'get',
  //     url: 'http://localhost:3000/spotify/user',
  //   }).then(({ data }) => {
  //     setUserInfo(data);
  //   });
  // };

  // const getTopOfUser = (type: string) => {
  //   axios({
  //     method: 'get',
  //     url: 'http://localhost:3000/spotify/top',
  //     params: { type: type },
  //   }).then(({ data }) => {
  //     setTopArtists(data.items);
  //   });
  // };

  const getRecentByTopArtists = () => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/spotify/recent',
    }).then((response) => {
      let { data } = response;
      setRecentAlbums(data);
    });
  };

  return (
    <>
      <Header getRecentByTopArtists={getRecentByTopArtists}></Header>
      <div className="content">
        <StreamListWrapper items={recentAlbums}></StreamListWrapper>
        <AlbumPlayerWrapper></AlbumPlayerWrapper>
        <SpotifyPlayerWrapper></SpotifyPlayerWrapper>
      </div>
    </>
  );
};

export default App;
