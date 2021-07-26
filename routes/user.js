import express from 'express';
const router = express.Router();

// custom utils And middlewares
import authJWT from '../middlewares/authJWT';

// application Controllers for Routes
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
 * @api {POST} /user/role 사용자 역할 설정
 * @apiName 사용자 및 선생님 역할 설정
 * @apiDescription 사용자의 역할을 설정하는 api입니다.
 * @apiPermission POST-role
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Authorization 사용자 JWT access token key.
 * @apiHeader {String} Refresh 사용자 JWT refresh token key.
 * @apiParam (Body) {String="parent","teacher"} role 사용자가 설정한 역할
 * @apiParam (Body) {Object} data 사용자가 설정한 역할별 데이터
 * @apiParam (parent) {String} data[nickname] 학부모 닉네임
 * @apiParam (teacher) {String} data[name] 선생님 실명
 * @apiParam (teacher) {String="M","F","N"} [data[gender]] 선생님 실명
 * @apiParam (teacher) {String} [data[birthday]] 선생님 생년월일
 * @apiParam (teacher) {String} [data[introduction]] 선생님 소개글
 * @apiParam (teacher) {Boolean} [data[can_rental]] 선생님 악기 대여 가능 여부
 *
 * @apiExample {curl} curl
 *   curl -X POST /user/role \
 *        -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *        -d '{"role":"parent", "data" : {"nickname" : "jiwon11"}}'
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'POST',
 *        url: '/user/role',
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *        data: {
 *          'role': 'parent',
 *          'data': {
 *              "nickname" : "jiwon11"
 *            }
 *        }
 *     });
 *     console.log('User role: ', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (Response) {String} accessToken 사용자의 role이 반영된 JWT access token
 * @apiSuccess (Response) {String} refreshToken 사용자의 role이 반영된 JWT refresh token
 * @apiSuccessExample {json} successExample
 * HTTP/1.1 200 OK
 * "statusCode": 200,
 * "body": {
 * "accessToken": "thisisjwtaccesstoken",
 * "refreshToken": "thisisjwtrefreshtoken"
 * }
 *
 * @apiUse Error
 */
router.post('/role', authJWT, userController.setRole);
/**
 * @api {PUT} /user/ 사용자 프로필 수정
 * @apiName 사용자 프로필 정보 수정
 * @apiDescription 사용자의 프로필 정보를 수정하는 api입니다.
 * @apiPermission PUT-user
 * @apiGroup User
 * @apiVersion 1.0.0
 *
 * @apiHeader {String} Authorization 사용자 JWT access token key.
 * @apiHeader {String} Refresh 사용자 JWT refresh token key.
 *
 * @apiParam (Body) {String} [phone_NO] 사용자 핸드폰 번호
 * @apiParam (parent) {String} [nickname] 학부모 닉네임
 * @apiParam (teacher) {String} [name] 선생님 실명
 * @apiParam (teacher) {String="M","F","N"} [gender] 선생님 성별
 * @apiParam (teacher) {String} [birthday] 선생님 생년월일
 * @apiParam (teacher) {String} [introduction] 선생님 소개글
 * @apiParam (teacher) {Boolean} [can_rental] 선생님 악기 대여 가능 여부
 * @apiExample {curl} curl
 *   curl -X PUT /user/ \
 *        -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *        -d '{"nickname": "jiwon111","phone_NO" : "10151849798"}'
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'PUT',
 *        url: '/user/role',
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *        data: {
 *          "phone_NO": "10151849798",
 *          "nickname": "jiwon111"
 *        }
 *     });
 *     console.log('User edit: ', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (Response) {Integer} statusCode 상태코드
 * @apiSuccess (Response) {Object} body Response body
 * @apiSuccess (Response) {Boolean} body[updated] 사용자 정보 수정 완료 여부
 * @apiSuccessExample {json} successExample
 * HTTP/1.1 200 OK
 * {
 * "statusCode": 200,
 * "body": {
 *     updated: true
 *     }
 * }
 *
 * @apiUse Error
 */
router.put('/', authJWT, userController.edit);

export default router;
