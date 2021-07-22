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
      let userRoleRecord;
      await UserModel.update({ role: roleDTO.role }, { where: { ID: userId } });
      const userRoleData = {
        ...roleDTO.data,
        ...{ user_ID: userId }
      };
      console.log(userRoleData);
      if (roleDTO.role === 'parent') {
        userRoleRecord = await ParentModel.create(userRoleData);
      } else if (roleDTO.role === 'teacher') {
        userRoleRecord = await TeacherModel.create(userRoleData);
      }
      const userRecord = await UserModel.getUserRole(userId);
      console.log(userRecord);
      return {
        statusCode: 200,
        result: userRecord
      };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err.message };
    }
  }
}
