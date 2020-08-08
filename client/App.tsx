import React, { useEffect, useState } from 'react';
import axios from 'axios';

import SpotifyPlayer from './components/Player/SpotifyPlayer';
import ItemList from './components/ItemList';
import StreamList from './components/Stream/StreamList';
import SpotifyPlayerWrapper from './components/Player/SpotifyPlayerWrapper';

const App: React.FC = () => {
  const [userInfo, setUserInfo] = useState<Object>({ user: null });
  const [topArtists, setTopArtists] = useState<any[]>([]);
  const [recentAlbums, setRecentAlbums] = useState<any[]>([]);

  const getUserData = () => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/spotify/user',
    }).then(({ data }) => {
      setUserInfo(data);
    });
  };

  const getTopOfUser = (type: string) => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/spotify/top',
      params: { type: type },
    }).then(({ data }) => {
      setTopArtists(data.items);
    });
  };

  const getRecentByTopArtists = () => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/spotify/recent',
    }).then(({ data }) => {
      setRecentAlbums(data);
    });
  };

  return (
    <div>
      <h1>hi</h1>
      <button onClick={getUserData}>Get User Data</button>
      <button
        onClick={() => {
          getTopOfUser('artists');
        }}
      >
        Get Top
      </button>
      <button onClick={getRecentByTopArtists}>Get Recent</button>
      <SpotifyPlayerWrapper></SpotifyPlayerWrapper>
      <ItemList items={topArtists}></ItemList>
      <StreamList items={recentAlbums}></StreamList>
    </div>
  );
};

export default App;
