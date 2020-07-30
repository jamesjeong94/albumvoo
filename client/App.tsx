import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  let [userInfo, setUserInfo] = useState({ user: null });
  const getUserData = () => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/spotify/user',
    }).then(({ data }) => {
      console.log(data);
      setUserInfo(data);
    });
  };
  const getTopOfUser = (type: string) => {
    axios({
      method: 'get',
      url: 'http://localhost:3000/spotify/top',
      params: { type: type },
    }).then(({ data }) => {
      console.log(data);
    });
  };
  return (
    <div>
      <h1>hi</h1>
      <button onClick={getUserData}>Get User Data</button>
      <button
        onClick={() => {
          getTopOfUser('track');
        }}
      >
        Get Top Tracks
      </button>
    </div>
  );
};

export default App;
