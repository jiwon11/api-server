import TeacherModel from '../models/teacher';
import ParentModel from '../models/parent';
import CustomRecommendModel from '../models/customRecommend';

export default class recommendService {
  static async createRequest(userId, requestRecommendDTO) {
    try {
      const { childId, cost, districtIds, styleIds } = requestRecommendDTO;
      const parentRecord = await ParentModel.findOne({ where: { user_ID: userId } });
      const parentHasChild = await parentRecord.hasChild(childId);
      if (parentHasChild) {
        const createdCustomRecommendRecord = await CustomRecommendModel.create({ child_ID: childId, parent_ID: parentRecord.id, cost: cost });
        await createdCustomRecommendRecord.addDistricts(districtIds);
        await createdCustomRecommendRecord.addLessonStyles(styleIds);
        const customRecommendRecord = await CustomRecommendModel.getRequestRecommend(createdCustomRecommendRecord.ID);
        return { statusCode: 201, result: customRecommendRecord };
      } else {
        return { statusCode: 409, result: '사용자 부모의 ID로 자녀 정보를 불러올 수 없습니다.' };
      }
    } catch (err) {
      return { statusCode: 500, result: err };
    }
  }
}
