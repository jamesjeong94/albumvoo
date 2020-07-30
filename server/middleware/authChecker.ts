const authChecker = (req: any, res: any, next: any) => {
  console.log(req);
  console.log(res);
  next();
};

export = authChecker;
