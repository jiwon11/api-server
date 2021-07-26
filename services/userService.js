import UserModel from '../models/user';
import ParentModel from '../models/parent';
import TeacherModel from '../models/teacher';

export default class UserService {
  static async login(userDTO) {
    try {
      const [userRecord, created] = await UserModel.findOrCreate({
        where: { phone_NO: userDTO.phone_NO, kakao_token: userDTO.kakao_token }
      });
      return { userRecord: userRecord.dataValues, created };
    } catch (err) {
      return err;
    }
  }

  static async setRole(userId, roleDTO) {
    try {
      const userRecord = await UserModel.findOne({ where: { ID: userId } });
      if (userRecord) {
        await userRecord.update({ role: roleDTO.role });
        const userRoleData = {
          ...roleDTO.data,
          ...{ user_ID: userId }
        };
        console.log(userRoleData);
        if (roleDTO.role === 'parent') {
          await ParentModel.create(userRoleData);
        } else if (roleDTO.role === 'teacher') {
          await TeacherModel.create(userRoleData);
        }
        const userRoleRecord = await UserModel.getUserRole(userId);
        console.log(userRoleData);
        return {
          statusCode: 200,
          result: userRoleRecord
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
      return {
        statusCode: 200,
        result: { updated: true }
      };
    } catch (err) {
      console.log(err.errors);
      return { statusCode: 500, result: err };
    }
  }
}
