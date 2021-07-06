/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/prefer-default-export
// eslint-disable-next-line no-unused-vars
export function start(_req, res, next) {
  const result = {
    status: 200,
    body: {
      message: 'hello world'
    }
  };
  console.log({ result });
  return res.status(200).json(result);
}

/*
exports.login = (req, res, next) => {
  res.send("respond with a resource");
  //authService.login(req.body.username, req.body.password, (err, result) => {});
};
*/
