import express from 'express';
const router = express.Router();

// custom utils And middlewares
import refresh from '../libs/utils/refresh';
import * as userController from '../controllers/userController';
/**
 * @apiDefine Error
 * @apiError (ErrorCode) 401 access token이 만료되지 않은경우
 * @apiErrorExample {json} 401 access token이 만료되지 않은경우
 * HTTP/1.1 401 Conflict
 * {
 *   message: "access token이 만료되지 않아 refresh 할 필요가 없습니다."
 * }
 * @apiError (ErrorCode) 404 디코딩 결과가 없음 OR 사용자 없음 OR 토큰이 헤더에 없는 경우
 * @apiErrorExample {json} 404 디코딩 결과가 없음
 * HTTP/1.1 401 Conflict
 * {
 *   message: "JWT 토큰에 사용자 정보가 없습니다."
 * }
 * @apiErrorExample {json} 404 사용자 없음
 * HTTP/1.1 404 Conflict
 * {
 *   message: "사용자가 존재하지 않습니다."
 * }
 * @apiErrorExample {json} 404 토큰이 헤더에 없는 경우
 * HTTP/1.1 401 Conflict
 * {
 *   message: "access token 또는 refresh token이 Header에 존재하지 않습니다."
 * }
 * @apiErrorExample {json} 500 Server Error
 * HTTP/1.1 500 Conflict
 * {
 *   message: "Server Error"
 * }
 */

/**
 * @api {POST} /auth/login 회원가입 및 로그인
 * @apiName 회원가입 및 로그인
 * @apiDescription 회원가입 및 로그인 api입니다. 튜닝 서비스는 카카오톡 소셜 로그인만을 지원하기 때문에, 로그인과 회원가입을 따로 분리하지 않습니다. 따라서, 서버에서는 사용자가 신규 생성 되었으면 response 값에 created라는 키를 통해 사용자가 새로 생성되었는지를 확인할 수 있습니다.
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * @apiPermission POST-login
 * @apiParam (Body) {String} phone_NO 사용자 핸드폰 번호
 * @apiParam (Body) {String} kakao_token 사용자 카카오 계정 토큰
 * @apiParam (Body) {String} profile_img 카카오 계정 프로필 이미지
 * @apiExample {curl} curl
 *   curl -X POST /auth/login \
 *        -d '{"phone_NO":"01012345678", "kakao_token":"thisiskakaotokenvalue"}'
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'POST',
 *        url: '/auth/login',
 *        data: {
 *          'phone_NO': '01012345678',
 *          'kakao_token': 'thisiskakaotokenvalue'
 *        }
 *     });
 *     console.log('User login: ', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (Response) {Boolean} created 사용자 신규 생성 여부 (신규 생성 여부에 따라 statuscode로 달라집니다. 신규 생성일 경우 201, 아닐 경우 200을 응답합니다.)
 * @apiSuccess (Response) {String} accessToken 사용자 JWT access token
 * @apiSuccess (Response) {String} refreshToken 사용자 JWT refresh token
 * @apiSuccessExample {json} created success
 * HTTP/1.1 201 OK
 * {
 *   "created": true,
 *   "accessToken": "thisisaccessTokenvalue",
 *   "refreshToken": "thisisrefreshTokenvalue",
 * }
 * @apiSuccessExample {json} login success
 * HTTP/1.1 200 OK
 * {
 *   "created": false,
 *   "accessToken": "thisisaccessTokenvalue",
 *   "refreshToken": "thisisrefreshTokenvalue",
 * }
 *
 */
router.post('/login', userController.login);

/**
 * @api {GET} /auth/refresh JWT Refresh 토큰 발급
 * @apiName JWT Refresh 토큰 발급
 * @apiDescription JWT Refresh 토큰 발급하는 api입니다.
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * @apiPermission GET-refresh
 * @apiParam (Query) {String} [id] 학생 ID
 * @apiHeader {String} Authorization 사용자 JWT access token key.
 * @apiHeader {String} Refresh 사용자 JWT refresh token key.
 * @apiExample {curl} curl
 *   curl -X GET /auth/refresh\
 *        -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'GET',
 *        url: '/auth/refresh',
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *     });
 *     console.log('refresh :', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (Response) {Integer} statusCode 상태코드
 * @apiSuccess (Response) {Object} body Response body
 * @apiSuccess (Response) {String} accessToken accessToken
 * @apiSuccess (Response) {String} refreshToken refreshToken
 * @apiSuccessExample {json} created success
 * HTTP/1.1 201 OK
 * {
 *     "statusCode": 201,
 *     "body": {
 *         "accessToken" : "thisisnewjwtaccesstoken"
 *         "refreshToken": "thisisnewjwtrefreshtoken",
 *     }
 * }
 * @apiUse Error
 */
router.get('/refresh', refresh);

export default router;
