import dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.HOST;

const authChecker = (req: any, res: any, next: any) => {
  console.log('checking auth');
  if (req.cookies.refresh_token && req.cookies.access_token) {
    next();
  } else if (!req.cookies.refresh_token && !req.cookies.access_token) {
    res.redirect(`${HOST}/spotify/auth/login`);
  } else {
    res.redirect(`${HOST}/spotify/auth/refresh`);
  }
};

export = authChecker;
