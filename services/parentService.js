import ParentModel from '../models/parent';
import StudentModel from '../models/student';

export default class parentService {
  static async get(userId) {
    const parentRecord = await ParentModel.findOne({
      where: {
        user_ID: userId
      }
    });
    if (parentRecord) {
      return {
        statusCode: 200,
        result: parentRecord
      };
    } else {
      return {
        statusCode: 404,
        result: '사용자를 찾을 수 없습니다.'
      };
    }
  }

  static async edit(parentId, parentEditDTO) {
    try {
      const editData = parentEditDTO;
      await StudentModel.update(editData, { where: { ID: studentId } });
      const updatedStudentRecord = await StudentModel.findOne({ where: { ID: studentId } });
      return {
        statusCode: 201,
        result: updatedStudentRecord
      };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err.message };
    }
  }
}
