import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import cookieParser from 'cookie-parser';
import spotifyRouter from './routers/spotifyRouter';
import authChecker from './middleware/authChecker';
import cors from 'cors';

dotenv.config();

const app: express.Application = express();

const PORT: string | number = process.env.PORT || 3000;
const HOST: string = process.env.HOST || 'http://localhost:3000';

const publicDir = express.static(path.resolve(__dirname, '../client/public'));

app
  .use(morgan('combined'))
  .use(cors({ credentials: true, origin: true }))
  .use(cookieParser());
app.use('/spotify', spotifyRouter);
app.use('/main', authChecker);
app.use('/main', publicDir);

app.get('/', (req, res) => {
  res.send('Landing page');
});

app.get('/main', (req, res) => {});

app.listen(PORT, () => {
  console.log(`Listening in on port ${PORT}`);
});
