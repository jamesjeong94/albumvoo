import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import spotifyRouter from './routers/spotifyRouter';
import qs from 'qs';
import morgan from 'morgan';

dotenv.config();

const app: express.Application = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(morgan('combined'));
app.use('/spotify', spotifyRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/main', (req, res) => {
  res.send('Wow auth!');
});

app.listen(PORT, () => {
  console.log(`Listening in on port ${PORT}`);
});
