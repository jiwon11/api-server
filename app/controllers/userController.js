import userService from '../services/userService';
import { sign, refresh } from '../libs/utils/jwt';
import redisClient from '../libs/utils/redis';
import { encrypt, decrypt } from '../libs/utils/encryption';

/*
exports.login = (req, res, next) => {
  res.send("respond with a resource");
  //authService.login(req.body.username, req.body.password, (err, result) => {});
};
*/

export const login = async function (req, res) {
  try {
    const kakaoPofile = req.user.profile;
    //console.log(kakaoPofile);
    const userDTO = {
      phone_NO: kakaoPofile._json.kakao_account.phone_number,
      kakao_token: kakaoPofile.id,
      profile_img: kakaoPofile._json.kakao_account.profile.profile_image_url
    };
    console.log(userDTO);
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
    const userToken = JSON.stringify({
      created: created,
      accessToken: accessToken,
      refreshToken: refreshToken
    });
    const encryptToken = encrypt(userToken);
    return res.redirect(`${process.env.CLIENT_HOST}/login?token=${encryptToken}`);
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err);
  }
};

export const getJWTByToken = async function (req, res) {
  try {
    const userToken = req.body.token;
    const decryptResult = decrypt(userToken);
    return res.jsonResult(200, JSON.parse(decryptResult));
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err);
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
    return res.jsonResult(statusCode, err);
  }
};

export const getByToken = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    const { statusCode, result } = await userService.getRoleData(userId, userRole);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err);
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
