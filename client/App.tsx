import React, { useEffect, useState } from 'react';
import axios from 'axios';

import ItemList from './components/ItemList';

const App: React.FC = () => {
  let [userInfo, setUserInfo] = useState<Object>({ user: null });
  let [topArtists, setTopArtists] = useState<any[]>([]);

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
      <ItemList items={topArtists} />
    </div>
  );
};

export default App;
