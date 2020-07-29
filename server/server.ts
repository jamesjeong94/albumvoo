import express = require('express');
import dotenv = require('dotenv');
import spotifyRouter = require('./routers/spotifyRouter');

dotenv.config();

const app: express.Application = express();
const PORT: string | number = process.env.PORT || 3000;
const CLIENT_ID = process.env.CLIENT_ID;

app.use('/spotify', spotifyRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/login', (req, res) => {
  var scopes = 'user-read-private user-read-email';
  res.redirect(
    'https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' +
      CLIENT_ID +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' +
      encodeURIComponent('localhost:3000/callback')
  );
});

app.get('/callback', (req, res) => {
  console.log(req.query);
});

app.listen(PORT, () => {
  console.log(`Listening in on port ${PORT}`);
});
