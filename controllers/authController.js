export function start(req, res, next) {
  return res.jsonResult(200, 'hello world', req.route);
}

/*
exports.login = (req, res, next) => {
  res.send("respond with a resource");
  //authService.login(req.body.username, req.body.password, (err, result) => {});
};
*/
