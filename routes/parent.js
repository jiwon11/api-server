import express from 'express';
const router = express.Router();

// custom utils And middlewares
import authJWT from '../middlewares/authJWT';

// application Controllers for Routes
import * as childController from '../controllers/childController';
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
 * @api {POST} /parent/child 사용자 자녀 등록
 * @apiName 사용자 자녀 등록
 * @apiDescription 사용자의 자녀를 등록하는 api입니다.
 * @apiGroup Parent [Student]
 * @apiVersion 1.0.0
 * @apiPermission POST-child
 * @apiHeader {String} Authorization 사용자 JWT access token key.
 * @apiHeader {String} Refresh 사용자 JWT refresh token key.
 * @apiParam (Body) {Integer} age 학생 나이
 * @apiParam (Body) {String} name 학생 이름
 * @apiParam (Body) {String} [phone_NO] 학생 핸드폰 번호
 * @apiParam (Body) {String} full_address 학생 주소지
 * @apiParam (Body) {Boolean} has_instrument 학생 악기 보유 여부
 * @apiParam (Body) {Boolean} has_lesson_experience 학생 레슨 경험 여부
 * @apiParam (Body) {Boolean} can_read_score 학생 악보 해석 가능 여부
 * @apiParam (Body) {List[Integer]} hope_instrument 학생이 배우고픈 악기 목록
 * @apiExample {curl} curl
 *   curl -X POST /parent/child \
 *         -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *        -d '{"age" : 20,"name": "정지원","gender" : "M","phone_NO" : "01051849798","has_instrument": true,"full_address": "경기도 성남시 분당구 삼평동","has_lesson_experience": true,"can_read_score": true}'
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'POST',
 *        url: '/parent/child',
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *        data: {
                "age" : 20,
                "name": "정지원",
                "gender" : "M",
                "phone_NO" : "01051849798",
                "has_instrument": true,
                "full_address": "경기도 성남시 분당구 삼평동",
                "has_lesson_experience": true,
                "can_read_score": true
            }
 *     });
 *     console.log('User child: ', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (Response) {Boolean} created 사용자 신규 생성 여부 (신규 생성 여부에 따라 statuscode가 달라집니다. 신규 생성일 경우 201, 아닐 경우 200을 응답합니다.)
 * @apiSuccess (Response) {String} accessToken 사용자 JWT access token
 * @apiSuccess (Response) {String} refreshToken 사용자 JWT refresh token
 * @apiSuccessExample {json} created success
 * HTTP/1.1 201 OK
 * {
 * "statusCode": 201,
 * "body": {
 *     created: true
 *     }
 * }
 *
 * @apiError (ErrorCode) 400 Request Body Error response
 * @apiErrorExample {json} 400 Error
 * HTTP/1.1 400 Conflict
 * {
 *   message: `${typeof childDTO}는 유효하지 않는 데이터 형태입니다.`
 * }
 * @apiError (ErrorCode) 409 Role Error response
 * @apiErrorExample {json} 409 Error
 * HTTP/1.1 409 Conflict
 * {
 *   message: "사용자의 역할로는 자녀를 등록할 수 없습니다."
 * }
 * @apiUse Error
 */
router.post('/child', authJWT, childController.add);
/**
 * @api {GET} /parent/children 사용자 자녀 전체 조회
 * @apiName 사용자 자녀 전체 조회
 * @apiDescription 사용자의 자녀 전체를 조회하는 api입니다.
 * @apiGroup Parent [Student]
 * @apiVersion 1.0.0
 * @apiPermission GET-children
 * @apiHeader {String} Authorization 사용자 JWT access token key.
 * @apiHeader {String} Refresh 사용자 JWT refresh token key.
 * @apiExample {curl} curl
 *   curl -X PUT parent/children\
 *        -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'GET',
 *        url: 'parent/children',
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *     });
 *     console.log('User children: ', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (Response) {Integer} statusCode 상태코드
 * @apiSuccess (Response) {Object=list} body Response body
 * @apiSuccess (Response) {String} body[ID] 자녀 ID
 * @apiSuccess (Response) {String} body[name] 자녀 이름
 * @apiSuccess (Response) {Integer} body[age] 자녀 나이
 * @apiSuccess (Response) {String} body[gender] 자녀 성별
 * @apiSuccess (Response) {String} body[phone_NO] 자녀 핸드폰 번호
 * @apiSuccess (Response) {String} body[full_address] 학생 주소지
 * @apiSuccess (Response) {Boolean} body[has_instrument] 학생 악기 보유 여부
 * @apiSuccess (Response) {Boolean} body[has_lesson_experience] 학생 레슨 경험 여부
 * @apiSuccess (Response) {Boolean} body[can_read_score] 학생 악보 해석 가능 여부
 * @apiSuccess (Response) {String} body[created_At] 학생 추가 일자
 * @apiSuccess (Response) {String} body[updated_At] 학생 수정 일자
 * @apiSuccessExample {json} created success
 * HTTP/1.1 201 OK
 * {
 *     "statusCode": 201,
 *     "body": [{
 *         "ID": "255c42c0-ede1-11eb-85e6-1d0abc89eafc",
 *         "name": "정지원",
 *         "age": 20,
 *         "gender": "M",
 *         "phone_NO": "01051849798",
 *         "has_instrument": true,
 *         "full_address": "경기도 성남시 분당구 삼평동",
 *         "has_lesson_experience": true,
 *         "can_read_score": true,
 *         "createdAt": "2021-07-26 16:14:41",
 *         "updatedAt": "2021-07-26 16:14:41",
 *         "deletedAt": null,
 *         "parent_ID": "32a65940-eb91-11eb-94eb-1bd36ef54096"
 *     }]
 * }
 *
 * @apiError (ErrorCode) 409 Role Error response
 * @apiErrorExample {json} 409 Error
 * HTTP/1.1 409 Conflict
 * {
 *   message: "자녀 정보를 조회할 수 없습니다."
 * }
 * @apiUse Error
 */
router.get('/children', authJWT, childController.getAll);
/**
 * @api {GET} parent/child?id={id} 사용자 자녀 개별 정보 조회
 * @apiName 사용자 자녀 개별 정보 조회
 * @apiDescription 사용자의 자녀 각각의 정보를 조회하는 api입니다.
 * @apiGroup Parent [Student]
 * @apiVersion 1.0.0
 * @apiPermission GET-child
 * @apiParam (Query) {String} [id] 학생 ID
 * @apiHeader {String} Authorization 사용자 JWT access token key.
 * @apiHeader {String} Refresh 사용자 JWT refresh token key.
 * @apiExample {curl} curl
 *   curl -X PUT /child?id=a66b38e0-eb83-11eb-a2ca-274661d6d1ff\
 *        -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'GET',
 *        url: '/parent/child?id=a66b38e0-eb83-11eb-a2ca-274661d6d1ff',
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *     });
 *     console.log('User child: ', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (Response) {Integer} statusCode 상태코드
 * @apiSuccess (Response) {Object} body Response body
 * @apiSuccess (Response) {String} body[ID] 자녀 ID
 * @apiSuccess (Response) {String} body[name] 자녀 이름
 * @apiSuccess (Response) {Integer} body[age] 자녀 나이
 * @apiSuccess (Response) {String} body[gender] 자녀 성별
 * @apiSuccess (Response) {String} body[phone_NO] 자녀 핸드폰 번호
 * @apiSuccess (Response) {String} body[full_address] 학생 주소지
 * @apiSuccess (Response) {Boolean} body[has_instrument] 학생 악기 보유 여부
 * @apiSuccess (Response) {Boolean} body[has_lesson_experience] 학생 레슨 경험 여부
 * @apiSuccess (Response) {Boolean} body[can_read_score] 학생 악보 해석 가능 여부
 * @apiSuccess (Response) {String} body[created_At] 학생 추가 일자
 * @apiSuccess (Response) {String} body[updated_At] 학생 수정 일자
 * @apiSuccessExample {json} created success
 * HTTP/1.1 201 OK
 * {
 *     "statusCode": 201,
 *     "body": {
 *         "ID": "255c42c0-ede1-11eb-85e6-1d0abc89eafc",
 *         "name": "정지원",
 *         "age": 20,
 *         "gender": "M",
 *         "phone_NO": "01051849798",
 *         "has_instrument": true,
 *         "full_address": "경기도 성남시 분당구 삼평동",
 *         "has_lesson_experience": true,
 *         "can_read_score": true,
 *         "createdAt": "2021-07-26 16:14:41",
 *         "updatedAt": "2021-07-26 16:14:41",
 *         "deletedAt": null,
 *         "parent_ID": "32a65940-eb91-11eb-94eb-1bd36ef54096"
 *     }
 * }
 *
 * @apiError (ErrorCode) 409 Role Error response
 * @apiErrorExample {json} 409 Error
 * HTTP/1.1 409 Conflict
 * {
 *   message: "자녀 정보를 조회할 수 없습니다."
 * }
 * @apiUse Error
 */
router.get('/child', authJWT, childController.getOne);
/**
 * @api {PUT} /parent/child 사용자 자녀 정보 수정
 * @apiName 사용자 자녀 정보 수정
 * @apiDescription 사용자의 자녀 정보를 수정하는 api입니다.
 * @apiGroup Parent [Student]
 * @apiVersion 1.0.0
 * @apiPermission PUT-child
 * @apiParam (Query) {String} [id] 학생 ID
 * @apiHeader {String} Authorization 사용자 JWT access token key.
 * @apiHeader {String} Refresh 사용자 JWT refresh token key.
 * @apiParam (Body) {Integer} [age] 학생 나이
 * @apiParam (Body) {String} [name] 학생 이름
 * @apiParam (Body) {String} [phone_NO] 학생 핸드폰 번호
 * @apiParam (Body) {String} [full_address] 학생 주소지
 * @apiParam (Body) {Boolean} [has_instrument] 학생 악기 보유 여부
 * @apiParam (Body) {Boolean} [has_lesson_experience] 학생 레슨 경험 여부
 * @apiParam (Body) {Boolean} [can_read_score] 학생 악보 해석 가능 여부
 * @apiExample {curl} curl
 *   curl -X PUT parent/child?id=a66b38e0-eb83-11eb-a2ca-274661d6d1ff\
 *        -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *        -d '{"age" : 21}'
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'PUT',
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *        url: '/parent/child?id=a66b38e0-eb83-11eb-a2ca-274661d6d1ff',
 *        data: {
                "age" : 21,
            }
 *     });
 *     console.log('User child: ', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (Response) {Integer} statusCode 상태코드
 * @apiSuccess (Response) {Object} body Response body
 * @apiSuccess (Response) {Boolean} body[created] 자녀 정보 수정 여부
 * @apiSuccessExample {json} created success
 * HTTP/1.1 201 OK
 * {
 * "statusCode": 201,
 * "body": {
 *     updated: true
 *     }
 * }
 *
 * @apiError (ErrorCode) 400 Request Body Error response
 * @apiErrorExample {json} 400 Error
 * HTTP/1.1 400 Conflict
 * {
 *   message: `${typeof childDTO}는 유효하지 않는 데이터 형태입니다.`
 * }
 * @apiError (ErrorCode) 409 Role Error response
 * @apiErrorExample {json} 409 Error
 * HTTP/1.1 409 Conflict
 * {
 *   message: "사용자의 역할로는 자녀를 등록할 수 없습니다."
 * }
 * @apiUse Error
 */
router.put('/child', authJWT, childController.edit);

/**
 * @api {DELETE} /parent/child 사용자 자녀 삭제
 * @apiName 사용자 자녀 정보 삭제
 * @apiDescription 사용자의 자녀 정보를 삭제하는 api입니다.
 * @apiGroup Parent [Student]
 * @apiVersion 1.0.0
 * @apiPermission DELETE-child
 * @apiParam (Query) {String} [id] 학생 ID
 * @apiHeader {String} Authorization 사용자 JWT access token key.
 * @apiHeader {String} Refresh 사용자 JWT refresh token key.
 * @apiExample {curl} curl
 *   curl -X DELETE parent/child?id=a66b38e0-eb83-11eb-a2ca-274661d6d1ff\
 *        -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'DELETE',
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *        url: '/parent/child?id=a66b38e0-eb83-11eb-a2ca-274661d6d1ff',
 *     });
 *     console.log('User Child deleted: ', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (Response) {Integer} statusCode 상태코드
 * @apiSuccess (Response) {Object} body Response body
 * @apiSuccess (Response) {Boolean} body[created] 자녀 정보 삭제 여부
 * @apiSuccessExample {json} created success
 * HTTP/1.1 204 No Content
 *
 * @apiError (ErrorCode) 409 Role Error response
 * @apiErrorExample {json} 409 Error
 * HTTP/1.1 409 Conflict
 * {
 *   message: "사용자의 역할로는 자녀 정보를 삭제할 수 없습니다."
 * }
 * @apiUse Error
 *
 * @apiError (ErrorCode) 409 해당 ID를 가진 자녀가 없을 경우
 * @apiErrorExample {json} 409 Error
 * HTTP/1.1 409 Conflict
 * {
 *   message: "자녀 정보를 조회할 수 없습니다."
 * }
 * @apiUse Error
 */
router.delete('/child', authJWT, childController.remove);
export default router;
