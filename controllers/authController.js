export function start(_req, res, next) {
  const result = {
    status: 200,
    body: {
      message: 'hello world'
    }
  };
  return res.status(200).json(result);
}

/*
exports.login = (req, res, next) => {
  res.send("respond with a resource");
  //authService.login(req.body.username, req.body.password, (err, result) => {});
};
*/
