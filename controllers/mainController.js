export function start(req, res, next) {
  return res.jsonResult(200, req.route);
}
