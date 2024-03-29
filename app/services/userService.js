import UserModel from '../models/user';
import ParentModel from '../models/parent';
import TeacherModel from '../models/teacher';

export default class UserService {
  static async login(userDTO) {
    try {
      const [userRecord, created] = await UserModel.findOrCreate({
        where: userDTO
      });
      return { userRecord: userRecord.dataValues, created };
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  static async setRole(userId, roleDTO) {
    try {
      const userRecord = await UserModel.findOne({ where: { ID: userId } });
      if (userRecord) {
        await userRecord.update({ role: roleDTO.role });
        return {
          statusCode: 201,
          result: userRecord
        };
      } else {
        return {
          statusCode: 404,
          result: '사용자를 찾을 수 없습니다.'
        };
      }
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async getRoleData(userId, userRole) {
    try {
      let userRoleRecord;
      if (userRole === 'parent') {
        userRoleRecord = await ParentModel.getByUserId(userId);
      } else if (userRole === 'teacher') {
        userRoleRecord = await TeacherModel.getByUserId(userId);
      }
      return {
        statusCode: 200,
        result: { role: userRole, userRoleRecord }
      };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async edit(userId, userRole, userEditDTO) {
    try {
      for (let userColumn of ['phone_NO', 'profile_img']) {
        if (userColumn in Object.keys(userEditDTO)) {
          const findColumn = {};
          findColumn[userColumn] = userEditDTO[userColumn];
          await UserModel.update(findColumn, { where: { ID: userId } });
        }
      }
      if (userRole === 'parent') {
        await ParentModel.update(userEditDTO, { where: { user_ID: userId } });
      } else if (userRole === 'teacher') {
        await TeacherModel.update(userEditDTO, { where: { user_ID: userId } });
      } else {
        return {
          statusCode: 409,
          result: '사용자의 role이 설정되지 않았습니다.'
        };
      }
      let includedModel;
      if (userRole === 'parent') {
        includedModel = ParentModel;
      } else {
        includedModel = TeacherModel;
      }
      const userRecord = await includedModel.findOne({
        where: {
          user_ID: userId
        },
        attributes: includedModel.getAttributes('self'),
        include: [
          {
            model: UserModel,
            attributes: []
          }
        ]
      });
      return {
        statusCode: 201,
        result: userRecord
      };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async withdrawal(userId) {
    try {
      await UserModel.destroy({
        where: { ID: userId }
      });
      return {
        statusCode: 204,
        result: { deleted: true }
      };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
