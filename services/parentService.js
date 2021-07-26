import ParentModel from '../models/parent';
import ChildModel from '../models/child';
import childService from './childService';

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

  static async hasChild(userId, childId) {
    const parentRecord = await ParentModel.findOne({
      where: {
        user_ID: userId
      }
    });
    if (parentRecord) {
      const hasChild = await parentRecord.hasChild(childId);
      return hasChild;
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
      await ParentModel.update(editData, { where: { ID: parentId } });
      const updatedParentRecord = await ParentModel.findOne({ where: { ID: parentId } });
      return {
        statusCode: 201,
        result: updatedParentRecord
      };
    } catch (err) {
      console.log(err.errors);
      return { statusCode: 500, result: err };
    }
  }
}
