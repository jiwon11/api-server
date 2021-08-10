/**
 * @apiDefine Error
 * @apiError (Error StatusCode) 400 [Bad Request] : 클라이언트 요청이 미리 정의된 파라미터 요구사항을 위반한 경우
 * @apiError (Error StatusCode) 401 [Unauthorized] : 인증 관련 정보가 유효하지 않은 경우
 * @apiError (Error StatusCode) 403 [Forbidden] : 해당 요청은 유효하나 서버 작업 중 접근이 허용되지 않은 자원을 조회하려는 경우
 * @apiError (Error StatusCode) 404 [Not Found] : 서버에서 해당 클라이언트 요청에 맞는 자원을 찾을 수 없는 경우
 * @apiError (Error StatusCode) 405 [Method Not Allowed] : HTTP Method 및 url 형태가 잘못된 경우
 * @apiError (Error StatusCode) 409 [Conflict] : 해당 요청의 처리가 비지니스 로직상 불가능하거나 모순이 생긴 경우
 * @apiErrorExample {json} 401 access token이 만료되지 않은경우
 * HTTP/1.1 401 Conflict
 * {
 *   message: "access token이 만료되지 않아 refresh 할 필요가 없습니다."
 * }
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

/**
 * @api {DELETE} /auth/withdrawal 사용자 탈퇴
 * @apiName 사용자 탈퇴
 * @apiDescription 사용자가 튜닝 서비스를 탈퇴하는 api입니다. <strong>현재 사용자 탈퇴 API는 구조만 잡혀 있고 제대로 실행되지 않습니다. 사용자와 관련된 모든 테이블 구현과 API가 구현되고 개발을 완료할 예정입니다.</strong>
 * @apiGroup Auth
 * @apiVersion 1.0.0
 * @apiPermission GET-refresh
 * @apiHeader {String} Authorization 사용자 JWT access token key.
 * @apiHeader {String} Refresh 사용자 JWT refresh token key.
 * @apiExample {curl} curl
 *   curl -X DELETE /auth/withdrawal\
 *        -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'DELETE',
 *        url: '/auth/withdrawal',
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *     });
 *     console.log('refresh :', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccessExample {json} delete success
 * HTTP/1.1 204 No Content
 * @apiUse Error
 */

/**
 * @api {POST} parent/ 학부모 프로필 등록
 * @apiName 학부모 프로필 등록
 * @apiDescription 학부모의 프로필을 등록하는 api입니다.
 * @apiGroup Parent
 * @apiVersion 1.0.0
 * @apiPermission POST-parent
 * @apiHeader {String} Authorization 사용자 JWT access token key.
 * @apiHeader {String} Refresh 사용자 JWT refresh token key.
 * @apiParam (Body) {String} nickname 닉네임
 * @apiExample {curl} curl
 *   curl -X POST /parent \
 *         -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *        -d '{"nickname": "jiwon11"}'
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'POST',
 *        url: '/parent',
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *        data: {
                "nickname" : "jiwon11"
            }
 *     });
 *     console.log('Parent: ', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (Response) {Integer} statusCode 상태코드
 * @apiSuccess (Response) {Object} body Response body
 * @apiSuccess (Response) {String} body[nickname] 학부모 닉네임
 * @apiSuccess (Response) {String} body[created_At] 학부모 생성 일자
 * @apiSuccess (Response) {String} body[updated_At] 학부모 수정 일자
 * @apiSuccess (Response) {String} User 학부모 사용자 정보
 * @apiSuccess (Response) {String} Children 학부모 자녀 정보
 * 
 * @apiSuccessExample {json} created success
 * HTTP/1.1 201 OK
 * {
 * "statusCode": 201,
 * "body": {
 *      "ID": "ce11d7b0-eeb1-11eb-9bbe-d1a0ca8b0150",
 *      "nickname": "jiwon11",
 *      "createdAt": "2021-07-27 17:08:19",
 *      "updatedAt": "2021-07-27 17:08:19",
 *      "deletedAt": null,
 *      "user_ID": "fd452430-eeaa-11eb-ad37-87ed5c10f54c",
 *      "User": {
 *          "ID": "fd452430-eeaa-11eb-ad37-87ed5c10f54c",
 *          "phone_NO": "01051849798",
 *          "role": "parent",
 *          "kakao_token": "",
 *          "isActive": true,
 *          "profile_img": "",
 *          "createdAt": "2021-07-27 16:19:32",
 *          "updatedAt": "2021-07-27 16:38:53",
 *          "deletedAt": null
 *      },
 *      "Children": []
 *  }
 * }
 *
 * @apiError (Error StatusCode) 400 Request Body Error response
 * @apiErrorExample {json} 400 Error
 * HTTP/1.1 400 Conflict
 * {
 *   message: `${typeof childDTO}는 유효하지 않는 데이터 형태입니다.`
 * }
 * @apiError (Error StatusCode) 409 Role Error response
 * @apiErrorExample {json} 409 Error
 * HTTP/1.1 409 Conflict
 * {
 *   message: "사용자의 역할로는 자녀를 등록할 수 없습니다."
 * }
 * @apiUse Error
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
 * @apiParam (Body) {List[Integer]=Instrument.ID} hope_instrument 학생이 배우고픈 악기 목록
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
 * @apiSuccess (Response) {String} body[ID] 자녀 ID
 * @apiSuccess (Response) {Integer} body[age] 학생 나이
 * @apiSuccess (Response) {String} body[name] 학생 이름
 * @apiSuccess (Response) {String} [phone_NO] 학생 핸드폰 번호
 * @apiSuccess (Response) {String} body[full_address] 학생 주소지
 * @apiSuccess (Response) {Boolean} body[has_instrument] 학생 악기 보유 여부
 * @apiSuccess (Response) {Boolean} body[has_lesson_experience] 학생 레슨 경험 여부
 * @apiSuccess (Response) {Boolean} body[can_read_score] 학생 악보 해석 가능 여부
 * @apiSuccess (Response) {String} body[created_At] 학생 추가 일자
 * @apiSuccess (Response) {String} body[updated_At] 학생 수정 일자
 * @apiSuccess (Response) {List} body[Instruments] 학생이 배우고픈 악기
 * @apiSuccessExample {json} created success
 * HTTP/1.1 201 OK
 * {
 * "statusCode": 201,
 * "body": {
 *      "ID": "2c8e1730-ee86-11eb-b406-45085e755e02",
 *      "name": "홍길동12",
 *      "age": 20,
 *      "gender": "M",
 *      "phone_NO": "01012345678",
 *      "has_instrument": true,
 *      "full_address": "경기도 성남시 분당구 삼평동",
 *      "has_lesson_experience": true,
 *      "can_read_score": true,
 *      "createdAt": "2021-07-27 11:56:00",
 *      "updatedAt": "2021-07-27 11:56:00",
 *      "deletedAt": null,
 *      "parent_ID": "b7fd4190-ee7e-11eb-b6c5-ab1668841ae8",
 *      "Instruments": []
 *  }
 * }
 *
 * @apiError (Error StatusCode) 400 Request Body Error response
 * @apiErrorExample {json} 400 Error
 * HTTP/1.1 400 Conflict
 * {
 *   message: `${typeof childDTO}는 유효하지 않는 데이터 형태입니다.`
 * }
 * @apiError (Error StatusCode) 409 Role Error response
 * @apiErrorExample {json} 409 Error
 * HTTP/1.1 409 Conflict
 * {
 *   message: "사용자의 역할로는 자녀를 등록할 수 없습니다."
 * }
 * @apiUse Error
 */
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
 * @apiSuccess (Response) {List} body[Instruments] 학생이 배우고픈 악기
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
 *         "parent_ID": "32a65940-eb91-11eb-94eb-1bd36ef54096",
 *         "Instruments": []
 *     }]
 * }
 *
 * @apiError (Error StatusCode) 409 Role Error response
 * @apiErrorExample {json} 409 Error
 * HTTP/1.1 409 Conflict
 * {
 *   message: "자녀 정보를 조회할 수 없습니다."
 * }
 * @apiUse Error
 */
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
 * @apiSuccess (Response) {List} body[Instruments] 학생이 배우고픈 악기
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
 *         "parent_ID": "32a65940-eb91-11eb-94eb-1bd36ef54096",
 *         "Instruments": []
 *     }
 * }
 *
 * @apiError (Error StatusCode) 409 Role Error response
 * @apiErrorExample {json} 409 Error
 * HTTP/1.1 409 Conflict
 * {
 *   message: "자녀 정보를 조회할 수 없습니다."
 * }
 * @apiUse Error
 */
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
 * @apiSuccess (Body) {Integer} body[age] 학생 나이
 * @apiSuccess (Body) {String} body[name] 학생 이름
 * @apiSuccess (Body) {String} body[phone_NO] 학생 핸드폰 번호
 * @apiSuccess (Body) {String} body[full_address] 학생 주소지
 * @apiSuccess (Body) {Boolean} body[has_instrument] 학생 악기 보유 여부
 * @apiSuccess (Body) {Boolean} body[has_lesson_experience] 학생 레슨 경험 여부
 * @apiSuccess (Body) {Boolean} body[can_read_score] 학생 악보 해석 가능 여부
 * @apiSuccess (Body) {String} body[createdAt] 생성일
 * @apiSuccess (Body) {String} body[updatedAt] 수정일
 * @apiSuccessExample {json} created success
 * HTTP/1.1 201 OK
 * {
 * "statusCode": 201,
 * "body": {
 *      "ID": "2c8e1730-ee86-11eb-b406-45085e755e02",
        "name": "홍길동12",
        "age": 20,
        "gender": "M",
        "phone_NO": "01012345678",
        "has_instrument": true,
        "full_address": "경기도 성남시 분당구 삼평동",
        "has_lesson_experience": true,
        "can_read_score": true,
        "createdAt": "2021-07-27 11:56:00",
        "updatedAt": "2021-07-27 11:56:00",
        "deletedAt": null,
        "parent_ID": "b7fd4190-ee7e-11eb-b6c5-ab1668841ae8"
 *    }
 * }
 *
 * @apiError (Error StatusCode) 400 Request Body Error response
 * @apiErrorExample {json} 400 Error
 * HTTP/1.1 400 Conflict
 * {
 *   message: `${typeof childDTO}는 유효하지 않는 데이터 형태입니다.`
 * }
 * @apiError (Error StatusCode) 409 Role Error response
 * @apiErrorExample {json} 409 Error
 * HTTP/1.1 409 Conflict
 * {
 *   message: "사용자의 역할로는 자녀를 등록할 수 없습니다."
 * }
 * @apiUse Error
 */

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
 * @apiError (Error StatusCode) 409 Role Error response
 * @apiErrorExample {json} 409 Error
 * HTTP/1.1 409 Conflict
 * {
 *   message: "사용자의 역할로는 자녀 정보를 삭제할 수 없습니다."
 * }
 * @apiUse Error
 *
 * @apiError (Error StatusCode) 409 해당 ID를 가진 자녀가 없을 경우
 * @apiErrorExample {json} 409 Error
 * HTTP/1.1 409 Conflict
 * {
 *   message: "자녀 정보를 조회할 수 없습니다."
 * }
 * @apiUse Error
 */

/**
 * @api {GET} /tag/instruments 악기 태그 전체 조회
 * @apiName 악기 태그 전체 조회
 * @apiDescription 악기 태그들 전체를 조회하는 api입니다.
 * @apiGroup Tag
 * @apiVersion 1.0.0
 * @apiPermission GET-TagInstrument
 * @apiHeader {String} Authorization 사용자 JWT access token key.
 * @apiHeader {String} Refresh 사용자 JWT refresh token key.
 * @apiExample {curl} curl
 *   curl -X GET /tag/instruments\
 *        -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'GET',
 *        url: '/tag/instruments',
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *     });
 *     console.log('Tag Instruments :', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (Response) {Integer} statusCode 상태코드
 * @apiSuccess (Response) {List[Object]} body Response body
 * @apiSuccess (Response) {Integer} ID 악기 ID
 * @apiSuccess (Response) {String} name 악기 이름
 * @apiSuccessExample {json} created success
 * HTTP/1.1 201 OK
 * {
 *     "statusCode": 200,
 *     "body": [
 *        {
 *            "ID": 1,
 *            "name": "바이올린"
 *        },
 *        ...
 *    ]
 * }
 * @apiUse Error
 */

/**
 * @api {GET} /tag/districts?limit={limit}&offset={offset} 지역 태그 전체 조회
 * @apiName 지역 태그 전체 조회
 * @apiDescription 지역 태그 전체를 조회하는 api입니다.
 * @apiGroup Tag
 * @apiVersion 1.0.0
 * @apiPermission GET-TagDistrict
 * @apiHeader {String} Authorization 사용자 JWT access token key.
 * @apiHeader {String} Refresh 사용자 JWT refresh token key.
 * @apiParam (Query) {String} limit 불러올 지역 row 개수
 * @apiParam (Query) {String} offset 무시할 지역 row 개수
 * @apiExample {curl} curl
 *   curl -X GET /tag/discricts?limit=20&offset=0\
 *        -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'GET',
 *        url: '/tag/discricts?limit=20&offset=0',
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *     });
 *     console.log('Tag Districts :', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (Response) {Integer} statusCode 상태코드
 * @apiSuccess (Response) {List[Object]} body Response body
 * @apiSuccess (Response) {Integer} ID 지역 ID
 * @apiSuccess (Response) {String} si_do 지역 시도
 * @apiSuccess (Response) {String} si_gun_gu 지역 시군구
 * @apiSuccess (Response) {String} eup_myeon_dong 지역 읍면동
 * @apiSuccessExample {json} created success
 * HTTP/1.1 201 OK
 * {
 *     "statusCode": 200,
 *     "body": [
 *        {
 *            "ID": 164,
 *            "si_do": "서울특별시",
 *            "si_gun_gu": "종로구",
 *            "eup_myeon_dong": "궁정동"
 *        },
 *        ...
 *    ]
 * }
 * @apiUse Error
 */

/**
 * @apiDefine successResponse
 * @apiSuccessExample {json} created success
 * HTTP/1.1 201 OK
 * {
 *    "statusCode": 201,
 *    "body": {
 *        "teacher": {
 *            "ID": "a5b3e2a0-eeab-11eb-a925-7ba9e6bb612e",
 *            "name": "정지원",
 *            "address": null,
 *            "gender": "M",
 *            "birthday": "1998-01-09",
 *            "introduction": "test",
 *            "certificated_edu": false,
 *            "can_rental": false,
 *            "hope_sales_month": 1000,
 *            "createdAt": "2021-07-27 16:24:15",
 *            "user_ID": "fd452430-eeaa-11eb-ad37-87ed5c10f54c",
 *            "phone_NO": "01051849798",
 *            "role": "parent",
 *            "kakao_token": "",
 *            "isActive": true,
 *            "profile_img": ""
 *        },
 *        "coverImgs": [
 *            {
 *                "ID": "a5b457d0-eeab-11eb-a925-7ba9e6bb612e",
 *                "name": "upperBody",
 *                "mime_type": "image/jpeg",
 *                "url": "https://tuninig-teacher-profile.s3.ap-northeast-2.amazonaws.com/original/162737065499813.jpg",
 *                "width": 0,
 *                "height": 0,
 *                "size": 48591,
 *                "teacher_ID": "a5b3e2a0-eeab-11eb-a925-7ba9e6bb612e"
 *            },
 *            ...
 *        ],
 *        "careers": [
 *            {
 *                "ID": 7,
 *                "category": "test",
 *                "description": "test",
 *                "start_date": "2021-10-01",
 *                "end_date": "2021-11-01",
 *                "teacher_ID": "a5b3e2a0-eeab-11eb-a925-7ba9e6bb612e"
 *            },
 *            ...
 *        ],
 *        "hope_districts": [
 *            {
 *                "ID": 164,
 *                "si_do": "서울특별시",
 *                "si_gun_gu": "종로구",
 *                "eup_myeon_dong": "궁정동",
 *                "HOPE_LESSON_DISTRICT": {
 *                    "createdAt": "2021-07-27 16:24:15",
 *                    "updatedAt": "2021-07-27 16:24:15",
 *                    "district_ID": 164,
 *                    "teacher_ID": "a5b3e2a0-eeab-11eb-a925-7ba9e6bb612e"
 *                }
 *            },
 *            ...
 *        ]
 *    }
 *}
 *
 * */
/**
 * @api {POST} teacher/profile 선생님 프로필 등록
 * @apiName 선생님 프로필 등록
 * @apiDescription 선생님의 프로필을 등록하는 api입니다.
 * @apiGroup Teacher
 * @apiVersion 1.0.0
 * @apiPermission POST-TeacherProfile
 * @apiHeader {String} Authorization 사용자 JWT access token key.
 * @apiHeader {String} Refresh 사용자 JWT refresh token key.
 * @apiParam (FormData) {File} upperBody 상반신 사진
 * @apiParam (FormData) {File} wholeBody 전신 사진
 * @apiParam (FormData) {File} performance 연주 사진
 * @apiParam (FormData) {File} lesson 레슨 중 사진
 * @apiParam (FormData) {List[Object]} career 경력
 * @apiParam (FormData) {List[Object]} career[category] 경력 종류
 * @apiParam (FormData) {List[Object]} career[description] 경력 설명
 * @apiParam (FormData) {String} career[start_date] 경력 시작일
 * @apiParam (FormData) {String} career[end_date] 경력 종료일
 * @apiParam (FormData) {List[Integer]=District.ID} hopeDistrict 레슨 희망 지역
 * @apiParam (FormData) {Object} performanceVideo 연주 영상 링크
 * @apiParam (FormData) {Object} profile 기본 프로필 정보
 * @apiParam (FormData) {String} profile[name] 이름
 * @apiParam (FormData) {String} profile[birthday] 생일
 * @apiParam (FormData) {Integer} profile[hope_sales_month] 희망 월 매출
 * @apiParam (FormData) {String} profile[introduction] 소개글
 * @apiParam (FormData) {String} profile[gender] 성별
 * @apiExample {curl} curl
 *   curl -X POST /teacher/profile \
 *         -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *        -d 'career:[{"category":"test","description":"test","start_date":"2021.10","end_date":"2021.11"},{"category":"test","description":"test","start_date":"2021.10","end_date":"2021.11"},{"category":"test","description":"test","start_date":"2021.10","end_date":"2021.11"}],hopeDistrict:[167,164,165,166], performanceVideo:{"url": "testUrl"}, profile:{"name" : "정지원", "birthday": "1998.01.09", "hope_sales_month": 1000, "introduction": "test", "gender": "M"}'
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      let form = new FormData();
 *      form.append('upperBody',ImageObj);
 *      form.append('wholeBody',ImageObj);
 *      form.append('performance',ImageObj);
 *      form.append('lesson',ImageObj);
 *      form.append('career', [{"category":"test","description":"test","start_date":"2021.10","end_date":"2021.11"},
 * {"category":"test","description":"test","start_date":"2021.10","end_date":"2021.11"},{"category":"test","description":"test","start_date":"2021.10","end_date":"2021.11"}]);
 *      form.append('hopeDistrict',[167,164,165,166]);
 *      form.append('performanceVideo', {"url": "testUrl"});
 *      form.append('profile',  {"name" : "정지원", "birthday": "1998.01.09", "hope_sales_month": 1000, "introduction": "test", "gender": "M"});
 *      const response = await axios({
 *        method: 'POST',
 *        url: '/teacher/profile',
 *        data: form,
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *     });
 *     console.log('Parent: ', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (Response) {Integer} statusCode 상태코드
 * @apiSuccess (Response) {Object} body Response body
 * @apiSuccess (Response) {Boolean} certificated_edu 학력 인증
 * @apiSuccess (Response) {List[Object]} CoverImgs 프로필 이미지 목록
 * @apiSuccess (Response) {List[Object]} Careers 경력 목록
 * @apiSuccess (Response) {List[Object]} Districts 희망 레슨 지역 목록
 * @apiUse successResponse
 * @apiUse Error
 * */

/**
 * @api {POST} teacher/profile/eduLevel 선생님 프로필 학력 등록
 * @apiName 선생님 프로필 학력 등록
 * @apiDescription 선생님의 프로필 중 학력을 등록하는 api입니다.
 * @apiGroup Teacher
 * @apiVersion 1.0.0
 * @apiPermission POST-TeacherEduLevelProfile
 * @apiHeader {String} Authorization 사용자 JWT access token key.
 * @apiHeader {String} Refresh 사용자 JWT refresh token key.
 * @apiParam (FormData) {File} eduLevel
 * @apiParam (FormData) {List[Object]} eduLevel 학력 정보
 * @apiParam (FormData) {String=middle,high,university,abroad} eduLevel[course] 교육기관
 * @apiParam (FormData) {String} eduLevel[school_name] 학교 이름
 * @apiParam (FormData) {String} eduLevel[subject] 전공
 * @apiParam (FormData) {String} eduLevel[start_date] 시작일
 * @apiParam (FormData) {String} eduLevel[end_date] 종료일
 * @apiExample {curl} curl
 *   curl -X POST /teacher/profile \
 *         -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *        -d 'eduLevel:[{"course":"test1","school_name": "name_test1","subject": "subject_test1","start_date": "2021.01.01","end_date":"2024.01.01"},{"course":"test2","school_name": "name_test2","subject": "subject_test2","start_date": "2021.01.01","end_date":"2024.01.01"}]'
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      let form = new FormData();
 *      form.append('eduLevel',ImageObj);
 *      form.append('eduLevel',ImageObj);
 *      form.append('eduLevel',[{"course":"test1","school_name": "name_test1","subject": "subject_test1","start_date": "2021.01.01","end_date":"2024.01.01"},{"course":"test2","school_name": "name_test2","subject": "subject_test2","start_date": "2021.01.01","end_date":"2024.01.01"}]);
 *      const response = await axios({
 *        method: 'POST',
 *        url: '/teacher/profile/eduLevel',
 *        data: form,
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *     });
 *     console.log('Parent eduLevel: ', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (Response) {Integer} statusCode 상태코드
 * @apiSuccess (Response) {Object} body Response body
 * @apiSuccess (Response) {String} eduLevel[school_name] 학교 이름
 * @apiSuccess (Response) {String} eduLevel[subject] 전공
 * @apiSuccess (Response) {String} eduLevel[identification_image_url] 학력 인증 이미지
 * @apiSuccess (Response) {String} eduLevel[start_date] 시작일
 * @apiSuccess (Response) {String} eduLevel[end_date] 종료일
 * @apiSuccessExample {json} created success
 * HTTP/1.1 201 OK
 * {
 *    "statusCode": 201,
 *    "body": [
 *        {
 *            "ID": 1,
 *            "course": "test1",
 *            "school_name": "name_test1",
 *            "subject": "subject_test1",
 *            "period": "2021~2024",
 *            "identification_image_url": "https://tuninig-teacher-profile.s3.ap-northeast-2.amazonaws.com/original/ *16273828655337AAD7977-8049-4198-9A8F-B7C955C731C7.jpeg",
 *            "createdAt": "2021-07-27 19:47:45",
 *            "updatedAt": "2021-07-27 19:47:45",
 *            "deletedAt": null,
 *            "teacher_ID": "2ef10da0-eeab-11eb-ad37-87ed5c10f54c"
 *        },
 *        ...
 *    ]
 *}
 * @apiErrorExample {json} 400 학력 정보와 인증 이미지의 개수가 다른 경우
 * HTTP/1.1 400 Conflict
 * {
 *   message: "학력 정보와 인증 이미지의 개수가 다릅니다. 학력 정보 개수 : 2, 인증 이미지 개수 : 3"
 * }
 * @apiUse Error
 * */
/**
 * @api {get} teacher/profile?id={id} 선생님 프로필 조회
 * @apiName 선생님 프로필 조회
 * @apiDescription 선생님의 프로필을 조회하는 api입니다.
 * @apiGroup Teacher
 * @apiVersion 1.0.0
 * @apiPermission GET-TeacherProfile
 * @apiHeader {String} Authorization 사용자 JWT access token key.
 * @apiHeader {String} Refresh 사용자 JWT refresh token key.
 * @apiParam (Query) {String} [id] 선생님 ID
 * @apiExample {curl} curl
 *   curl -X GET /teacher/profile?id=a5b3e2a0-eeab-11eb-a925-7ba9e6bb612e \
 *         -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'GET',
 *        url: '/teacher/profile?id=a5b3e2a0-eeab-11eb-a925-7ba9e6bb612e',
 *        data: form,
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *     });
 *     console.log('Parent: ', response);
 *   } catch (error) {
 *     console.error(error);
 *   }
 *
 * @apiSuccess (Response) {Integer} statusCode 상태코드
 * @apiSuccess (Response) {Object} body Response body
 * @apiSuccess (Response) {Boolean} certificated_edu 학력 인증
 * @apiSuccess (Response) {List[Object]} CoverImgs 프로필 이미지 목록
 * @apiSuccess (Response) {List[Object]} Careers 경력 목록
 * @apiSuccess (Response) {List[Object]} Districts 희망 레슨 지역 목록
 *
 *
 * @apiSuccess (Response) {Integer} statusCode 상태코드
 * @apiSuccess (Response) {Object} body Response body
 * @apiSuccess (Response) {Boolean} certificated_edu 학력 인증
 * @apiSuccess (Response) {List[Object]} CoverImgs 프로필 이미지 목록
 * @apiSuccess (Response) {List[Object]} Careers 경력 목록
 * @apiSuccess (Response) {List[Object]} Districts 희망 레슨 지역 목록
 * @apiUse successResponse
 * @apiUse Error
 * */

/**
 * @apiDefine Error
 * @apiError (Error StatusCode) 400 [Bad Request] : 클라이언트 요청이 미리 정의된 파라미터 요구사항을 위반한 경우
 * @apiError (Error StatusCode) 401 [Unauthorized] : 인증 관련 정보가 유효하지 않은 경우
 * @apiError (Error StatusCode) 403 [Forbidden] : 해당 요청은 유효하나 서버 작업 중 접근이 허용되지 않은 자원을 조회하려는 경우
 * @apiError (Error StatusCode) 404 [Not Found] : 서버에서 해당 클라이언트 요청에 맞는 자원을 찾을 수 없는 경우
 * @apiError (Error StatusCode) 405 [Method Not Allowed] : HTTP Method 및 url 형태가 잘못된 경우
 * @apiError (Error StatusCode) 409 [Conflict] : 해당 요청의 처리가 비지니스 로직상 불가능하거나 모순이 생긴 경우
 * @apiErrorExample {json} 401 access token이 만료되지 않은경우
 * HTTP/1.1 401 Conflict
 * {
 *   message: "access token이 만료되지 않아 refresh 할 필요가 없습니다."
 * }
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
 *
 * @apiExample {curl} curl
 *   curl -X POST /user/role \
 *        -H "Authorization: Bearer thisisjwtaccesstoken"\
 *        -H "Refresh: Bearer thisisjwtrefreshtoken"\
 *        -d '{"role":"parent"}'
 *
 * @apiExample {node.js} node.js
 *   const axios = require('axios');
 *   try {
 *      const response = await axios({
 *        method: 'POST',
 *        url: '/user/role',
 *        headers: { 'Authorization': 'Bearer thisisjwtaccesstoken', "Refresh" : "thisisjwtrefreshtoken" }
 *        data: {
 *          'role': 'parent'
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
