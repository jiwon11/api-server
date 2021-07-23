import userService from '../services/userService';
import { sign, refresh } from '../libs/utils/jwt';
import redisClient from '../libs/utils/redis';

/*
exports.login = (req, res, next) => {
  res.send("respond with a resource");
  //authService.login(req.body.username, req.body.password, (err, result) => {});
};
*/

export const login = async function (req, res) {
  const userDTO = req.body;
  const { userRecord, created } = await userService.login(userDTO);

  const accessToken = sign(userRecord);
  const refreshToken = refresh();

  redisClient.set(userRecord.ID, refreshToken, (err, result) => {
    console.log(err);
  });

  return res.jsonResult(201, {
    created,
    accessToken: accessToken,
    refreshToken: refreshToken
  });
};

export const setRole = async function (req, res) {
  const userId = req.user.ID;
  const roleDTO = req.body;
  const { statusCode, result } = await userService.setRole(userId, roleDTO);
  return res.jsonResult(statusCode, result);
};
