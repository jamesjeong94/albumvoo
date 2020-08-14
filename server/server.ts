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

const publicDir = express.static(path.resolve(__dirname, '../public'));

app.use(morgan('combined')).use(cors()).use(cookieParser()).use(express.json());
app.use('/spotify', spotifyRouter);
app.use('/spotify', authChecker);
app.use(publicDir);

app.get('/main', authChecker, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening in on port ${PORT}`);
});
