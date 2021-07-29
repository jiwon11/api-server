import UserModel from '../models/user';
import ParentModel from '../models/parent';
import ChildModel from '../models/child';

export default class parentService {
  static async create(userId, parentDTO) {
    try {
      const createdParent = await ParentModel.create({
        ...parentDTO,
        ...{ user_ID: userId }
      });

      const parentRecord = await ParentModel.findByPk(createdParent.ID, { include: [UserModel, ChildModel] });
      return {
        statusCode: 201,
        result: parentRecord
      };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async get(userId) {
    const parentRecord = await ParentModel.findOne({
      attributes: ParentModel.getAttributes('self'),
      where: {
        user_ID: userId
      },
      include: [
        {
          model: UserModel,
          attributes: []
        }
      ]
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
