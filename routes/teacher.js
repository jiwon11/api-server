import express from 'express';
import { upload } from '../middlewares/multer';
import authJWT from '../middlewares/authJWT';

var router = express.Router();
// custom utils And middlewares

// application Controllers for Routes
import * as teacherController from '../controllers/teacherController';

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
 *            {
 *                "ID": "a5b47ee0-eeab-11eb-a925-7ba9e6bb612e",
 *                "name": "wholeBody",
 *                "mime_type": "image/jpeg",
 *                "url": "https://tuninig-teacher-profile.s3.ap-northeast-2.amazonaws.com/original/1627370654998IMG_1593.JPG",
 *                "width": 0,
 *                "height": 0,
 *                "size": 84867,
 *                "teacher_ID": "a5b3e2a0-eeab-11eb-a925-7ba9e6bb612e"
 *            },
 *            {
 *                "ID": "a5b47ee1-eeab-11eb-a925-7ba9e6bb612e",
 *                "name": "performance",
 *                "mime_type": "image/jpeg",
 *                "url": "https://tuninig-teacher-profile.s3.ap-northeast-2.amazonaws.com/original/ *162737065500220526B34-A7BB-4D9B-AAA0-95135A5F84F0.jpeg",
 *                "width": 0,
 *                "height": 0,
 *                "size": 96771,
 *                "teacher_ID": "a5b3e2a0-eeab-11eb-a925-7ba9e6bb612e"
 *            },
 *            {
 *                "ID": "a5b47ee2-eeab-11eb-a925-7ba9e6bb612e",
 *                "name": "lesson",
 *                "mime_type": "image/jpeg",
 *                "url": "https://tuninig-teacher-profile.s3.ap-northeast-2.amazonaws.com/original/ *1627370655005766B6D9E-98AE-4B5F-B54C-E53614698FC3.jpeg",
 *                "width": 0,
 *                "height": 0,
 *                "size": 258902,
 *                "teacher_ID": "a5b3e2a0-eeab-11eb-a925-7ba9e6bb612e"
 *            },
 *            {
 *                "ID": "a5b54230-eeab-11eb-a925-7ba9e6bb612e",
 *                "name": "performanceVideo",
 *                "mime_type": "video/mp4",
 *                "url": "testUrl",
 *                "width": 0,
 *                "height": 0,
 *                "size": 0,
 *                "teacher_ID": "a5b3e2a0-eeab-11eb-a925-7ba9e6bb612e"
 *            }
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
 *            {
 *                "ID": 8,
 *                "category": "test",
 *                "description": "test",
 *                "start_date": "2021-10-01",
 *                "end_date": "2021-11-01",
 *                "teacher_ID": "a5b3e2a0-eeab-11eb-a925-7ba9e6bb612e"
 *            },
 *            {
 *                "ID": 9,
 *                "category": "test",
 *                "description": "test",
 *                "start_date": "2021-10-01",
 *                "end_date": "2021-11-01",
 *                "teacher_ID": "a5b3e2a0-eeab-11eb-a925-7ba9e6bb612e"
 *            }
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
 *            {
 *                "ID": 165,
 *                "si_do": "서울특별시",
 *                "si_gun_gu": "종로구",
 *                "eup_myeon_dong": "효자동",
 *                "HOPE_LESSON_DISTRICT": {
 *                    "createdAt": "2021-07-27 16:24:15",
 *                    "updatedAt": "2021-07-27 16:24:15",
 *                    "district_ID": 165,
 *                    "teacher_ID": "a5b3e2a0-eeab-11eb-a925-7ba9e6bb612e"
 *                }
 *            },
 *            {
 *                "ID": 166,
 *                "si_do": "서울특별시",
 *                "si_gun_gu": "종로구",
 *                "eup_myeon_dong": "창성동",
 *                "HOPE_LESSON_DISTRICT": {
 *                    "createdAt": "2021-07-27 16:24:15",
 *                    "updatedAt": "2021-07-27 16:24:15",
 *                    "district_ID": 166,
 *                    "teacher_ID": "a5b3e2a0-eeab-11eb-a925-7ba9e6bb612e"
 *                }
 *            },
 *            {
 *                "ID": 167,
 *                "si_do": "서울특별시",
 *                "si_gun_gu": "종로구",
 *                "eup_myeon_dong": "통인동",
 *                "HOPE_LESSON_DISTRICT": {
 *                    "createdAt": "2021-07-27 16:24:15",
 *                    "updatedAt": "2021-07-27 16:24:15",
 *                    "district_ID": 167,
 *                    "teacher_ID": "a5b3e2a0-eeab-11eb-a925-7ba9e6bb612e"
 *                }
 *            }
 *        ]
 *    }
 *}
 *
 * */

/* set routes from Controllers */
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
 * @apiParam (FormData) {List[Integer=District.id]} hopeDistrict 레슨 희망 지역
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
 * */
router.post('/profile', authJWT, upload.fields([{ name: 'upperBody' }, { name: 'wholeBody' }, { name: 'performance' }, { name: 'lesson' }]), teacherController.createProfile);

router.post('/profile/eduLevel', authJWT, upload.array('eduLevel'), teacherController.uploadEduLevel);
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
 *
 * */
router.get('/profile', authJWT, teacherController.getProfile);
export default router;
