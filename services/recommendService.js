import TeacherModel from '../models/teacher';
import ParentModel from '../models/parent';
import CustomRecommendModel from '../models/customRecommend';
import { Op } from 'sequelize';
export default class recommendService {
  static async getRequests(requestId, limit, offset) {
    try {
      let getAllRequestId;
      if (requestId) {
        getAllRequestId = requestId;
      } else {
        getAllRequestId = { [Op.not]: null };
      }
      const requestRecord = await CustomRecommendModel.getRequestRecommend(getAllRequestId, limit, offset);
      return { statusCode: 200, result: requestRecord };
    } catch (err) {
      return { statusCode: 500, result: err };
    }
  }
  static async createRequest(userId, requestRecommendDTO) {
    try {
      const { childId, cost, districtIds, styleIds } = requestRecommendDTO;
      if (districtIds.length > 3 || styleIds.length > 3) {
        const errorParams = districtIds.length > 3 ? '지역' : '스타일';
        return { statusCode: 400, result: `${errorParams}의 개수가 3개를 초과하였습니다.` };
      }
      const parentRecord = await ParentModel.findOne({ where: { user_ID: userId } });
      const parentHasChild = await parentRecord.hasChild(childId);
      if (parentHasChild) {
        const createdRequestRecord = await CustomRecommendModel.create({ child_ID: childId, parent_ID: parentRecord.ID, cost: cost });
        await createdRequestRecord.addDistricts(districtIds);
        await createdRequestRecord.addLessonStyles(styleIds);
        const requestRecord = await CustomRecommendModel.getRequestRecommend(createdRequestRecord.ID);
        return { statusCode: 201, result: requestRecord };
      } else {
        return { statusCode: 409, result: '사용자 부모의 ID로 자녀 정보를 불러올 수 없습니다.' };
      }
    } catch (err) {
      return { statusCode: 500, result: err };
    }
  }

  static async confirmRequest(requestId, recommendTeacherDTO) {
    try {
      const { teacherIds } = recommendTeacherDTO;
      if (teacherIds.length > 3 || teacherIds.length < 1) {
        return { statusCode: 400, result: `추천 선생님은 최소 1명, 최대 3명까지 추천할 수 있습니다. 입력한 선생님 수 : ${teacherIds.length}` };
      }
      const requestRecord = await CustomRecommendModel.getRequestRecommend(requestId);
      await requestRecord.update({ has_confirm: true });
      await requestRecord.addTeachers(teacherIds);
      const updatedRequestRecord = await CustomRecommendModel.getRequestRecommend(requestRecord.ID);
      return { statusCode: 201, result: updatedRequestRecord };
    } catch (err) {
      return { statusCode: 500, result: err };
    }
  }
}
