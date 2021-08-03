import ParentModel from '../models/parent';
import ChildModel from '../models/child';
import InstrumentModel from '../models/instrument';
export default class childService {
  static async create(userId, childDTO) {
    try {
      const parentRecord = await ParentModel.findOne({
        where: { user_ID: userId }
      });
      const newChildRecord = await ChildModel.create({
        ...childDTO,
        ...{ parent_ID: parentRecord.ID }
      });
      await newChildRecord.addInstruments(childDTO.hope_instrument);
      const childRecord = await ChildModel.findByPk(newChildRecord.ID, { attributes: ChildModel.getAttributes, include: [{ model: InstrumentModel }] });
      return {
        statusCode: 201,
        result: childRecord
      };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async getOne(childId) {
    try {
      const childRecords = await ChildModel.findByPk(childId, {
        attributes: ChildModel.getAttributes,
        include: [{ model: InstrumentModel }]
      });
      return {
        statusCode: 200,
        result: childRecords
      };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async getAll(parentId) {
    try {
      const childRecords = await ChildModel.findAll({
        attributes: ChildModel.getAttributes,
        where: {
          parent_ID: parentId
        },
        include: [{ model: InstrumentModel }]
      });
      return {
        statusCode: 200,
        result: childRecords
      };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async edit(childId, childEditDTO) {
    try {
      const editData = childEditDTO;
      const updatedChildRecord = await ChildModel.findByPk(childId);
      await updatedChildRecord.update(editData);
      const childRecord = await ChildModel.findByPk(updatedChildRecord.ID);
      return {
        statusCode: 201,
        result: childRecord
      };
    } catch (err) {
      console.log(err);
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
