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

  const accessToken = sign(result);
  const refreshToken = refresh();

  redisClient.del(result.ID, function (err, response) {
    if (response == 1) {
      console.log('성공적으로 이전 토큰을 삭제하였습니다!');
    } else {
      console.log(`삭제에 실패하였습니다. {err.message}`);
    }
  });

  redisClient.set(result.ID, refreshToken, (err, result) => {
    console.log(err);
  });
  return res.jsonResult(statusCode, {
    accessToken: accessToken,
    refreshToken: refreshToken
  });
};

export const edit = async function (req, res) {
  const userId = req.user.ID;
  const userRole = req.user.role;
  const userEditDTO = req.body;
  const { statusCode, result } = await userService.edit(userId, userRole, userEditDTO);
  return res.jsonResult(statusCode, result);
};
