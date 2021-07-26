import ParentModel from '../models/parent';
import ChildModel from '../models/child';
import InstrumentModel from '../models/instrument';
export default class childService {
  static async add(userId, childDTO) {
    try {
      const parentRecord = await ParentModel.findOne({
        where: { user_ID: userId }
      });
      const childRecord = await ChildModel.create({
        ...childDTO,
        ...{ parent_ID: parentRecord.ID }
      });
      await childRecord.addInstruments(childDTO.hope_instrument);
      return {
        statusCode: 201,
        result: { created: true }
      };
    } catch (err) {
      console.log(err.errors);
      return { statusCode: 500, result: err };
    }
  }

  static async getOne(childId) {
    try {
      const childRecords = await ChildModel.findByPk(childId);
      return {
        statusCode: 201,
        result: childRecords
      };
    } catch (err) {
      console.log(err.errors);
      return { statusCode: 500, result: err };
    }
  }

  static async getAll(parentId) {
    try {
      const childRecords = await ChildModel.findAll({
        where: {
          parent_ID: parentId
        }
      });
      return {
        statusCode: 201,
        result: childRecords
      };
    } catch (err) {
      console.log(err.errors);
      return { statusCode: 500, result: err };
    }
  }

  static async edit(childId, childEditDTO) {
    try {
      const editData = childEditDTO;
      await ChildModel.update(editData, { where: { ID: childId } });
      return {
        statusCode: 201,
        result: { updated: true }
      };
    } catch (err) {
      console.log(err.errors);
      return { statusCode: 500, result: err };
    }
  }

  static async remove(childId) {
    try {
      await ChildModel.destroy({ where: { ID: childId } });
      return {
        statusCode: 204,
        result: { deleted: true }
      };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }
}
