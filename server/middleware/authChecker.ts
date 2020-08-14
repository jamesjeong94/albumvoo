import dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.HOST;

const authChecker = (req: any, res: any, next: any) => {
  console.log('checking auth');
  next();
  // if (req.cookies.refresh_token && req.cookies.access_token) {
  //   next();
  // } else if (!req.cookies.refresh_token && !req.cookies.access_token) {
  //   console.log('no tokens, log in');
  //   res.redirect(`${HOST}/spotify/auth/login`);
  // } else {
  //   console.log('no access token, refreshing');
  //   res.redirect(`${HOST}/spotify/auth/refresh`);
  // }
};

export = authChecker;
