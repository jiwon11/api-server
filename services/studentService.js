import ParentModel from '../models/parent';
import StudentModel from '../models/student';

export default class studentService {
  static async add(userId, studentDTO) {
    try {
      const parentRecord = await ParentModel.findOne({
        where: { user_ID: userId }
      });
      const studentRecord = await StudentModel.create({
        ...studentDTO,
        ...{ parent_ID: parentRecord.ID }
      });
      return {
        statusCode: 201,
        result: { parentRecord, studentRecord }
      };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err.message };
    }
  }

  static async getAll(parentId) {
    try {
      const studentRecords = await StudentModel.findAll({
        where: {
          parent_ID: parentId
        }
      });
      return {
        statusCode: 201,
        result: studentRecords
      };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err.message };
    }
  }

  static async edit(studentId, studentEditDTO) {
    try {
      const editData = studentEditDTO;
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
