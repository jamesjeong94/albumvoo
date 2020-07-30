import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import spotifyRouter from './routers/spotifyRouter';
import authChecker from './middleware/authChecker';

dotenv.config();

const app: express.Application = express();
const PORT: string | number = process.env.PORT || 3000;

const publicDir = express.static(path.resolve(__dirname, '../client/public'));

app.use(morgan('combined'));
app.use('/spotify', spotifyRouter);
// app.use(publicDir);

app.get('/', authChecker, (req, res) => {
  console.log('is this workin');
  // console.log(req);
  res.sendFile(path.resolve(__dirname, '../client/public/index.html'));
});

app.get('/main', (req, res) => {
  // console.log(req);
  // console.log(res);
  res.redirect('http://localhost:3000');
});

app.listen(PORT, () => {
  console.log(`Listening in on port ${PORT}`);
});
