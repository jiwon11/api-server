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
  try {
    const userDTO = req.body;
    const { userRecord, created } = await userService.login(userDTO);

    const accessToken = sign(userRecord);
    const refreshToken = refresh();

    redisClient.set(userRecord.ID, refreshToken, (err, result) => {
      console.log(err);
    });

    let statusCode;
    if (created) {
      statusCode = 201;
    } else {
      statusCode = 200;
    }
    return res.jsonResult(statusCode, {
      created,
      accessToken: accessToken,
      refreshToken: refreshToken
    });
  } catch (err) {
    return res.jsonResult(statusCode, result.errors);
  }
};

export const setRole = async function (req, res) {
  try {
    const userId = req.user.ID;
    const roleDTO = req.body;
    const { statusCode, result } = await userService.setRole(userId, roleDTO);
    if (statusCode === 200) {
      const accessToken = sign(result);
      const refreshToken = refresh();

      redisClient.del(result.ID, function (err, response) {
        if (response == 1) {
          console.log('성공적으로 이전 토큰을 삭제하였습니다!');
        } else {
          console.log(`삭제에 실패하였습니다. ${err.message}`);
        }
      });

      redisClient.set(result.ID, refreshToken, (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log(result);
      });
      return res.jsonResult(statusCode, {
        accessToken: accessToken,
        refreshToken: refreshToken
      });
    } else {
      return res.jsonResult(statusCode, result.errors);
    }
  } catch (err) {
    return res.jsonResult(statusCode, result.errors);
  }
};

export const getByToken = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    const { statusCode, result } = await userService.getRoleData(userId, userRole);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    return res.jsonResult(500, result.errors);
  }
};

export const edit = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    const userEditDTO = req.body;
    const { statusCode, result } = await userService.edit(userId, userRole, userEditDTO);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    return res.jsonResult(statusCode, result.errors);
  }
};

export const withdrawal = async function (req, res) {
  try {
    const userId = req.user.ID;
    const { statusCode, result } = await userService.withdrawal(userId);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    return res.jsonResult(statusCode, result.errors);
  }
};
