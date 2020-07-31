import dotenv from 'dotenv';

dotenv.config();

const HOST = process.env.HOST;

const authChecker = (req: any, res: any, next: any) => {
  if (req.cookies.refresh_token && req.cookies.access_token) {
    next();
  } else {
    res.redirect(`${HOST}/spotify/auth/login`);
  }
};

export = authChecker;
