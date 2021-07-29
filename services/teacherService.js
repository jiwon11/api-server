import TeacherModel from '../models/teacher';
import CoverImg from '../models/cover_img';
import Career from '../models/career';
import EducationLevel from '../models/education_level';

export default class teacherService {
  static async createProfile(userId, teacherDTO, coverImgDTO, performanceVideoDTO, careerDTO, hopeDistrictDTO) {
    const createdTeacher = await TeacherModel.create({
      ...teacherDTO,
      ...{
        user_ID: userId
      }
    });
    console.time('createCoverImg');
    await Promise.all(
      coverImgDTO.map(coverImg =>
        CoverImg.create({
          name: coverImg.fieldname,
          mime_type: coverImg.mimetype,
          url: coverImg.location,
          size: coverImg.size,
          width: 0,
          height: 0,
          teacher_ID: createdTeacher.ID
        })
      )
    );
    console.timeEnd('createCoverImg');
    console.time('createPerformanceVideo');
    await CoverImg.create({
      name: 'performanceVideo',
      mime_type: 'video/mp4',
      url: performanceVideoDTO.url,
      size: 0,
      width: 0,
      height: 0,
      teacher_ID: createdTeacher.ID
    });
    console.timeEnd('createPerformanceVideo');
    console.time('createCareer');
    await Promise.all(
      careerDTO.map(career =>
        Career.create({
          ...career,
          ...{ teacher_ID: createdTeacher.ID }
        })
      )
    );
    console.timeEnd('createCareer');
    console.time('addDistricts');
    await createdTeacher.addDistricts(hopeDistrictDTO);
    console.timeEnd('addDistricts');
    const teacherRecord = await TeacherModel.getTeacherProfile(createdTeacher.ID);
    return { statusCode: 201, result: teacherRecord };
  }

  static async getAll(limit, offset) {
    try {
      const teacherRecord = await TeacherModel.getAll(limit, offset);
      return { statusCode: 200, result: teacherRecord };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async getProfile(targetTeacherId) {
    try {
      const teacherRecord = await TeacherModel.getTeacherProfile(targetTeacherId);
      return { statusCode: 200, result: teacherRecord };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async uploadEduLevel(userId, eduImgFileDTO, eduLevelDTO) {
    try {
      const teacherRecord = await TeacherModel.findOne({
        where: {
          user_ID: userId
        }
      });
      if (eduImgFileDTO.length !== eduLevelDTO.length) {
        return { statusCode: 400, result: `학력 정보와 인증 이미지의 개수가 다릅니다. 학력 정보 개수 : ${eduLevelDTO.length}, 인증 이미지 개수 : ${eduImgFileDTO.length}` };
      }
      await Promise.all(
        eduLevelDTO.map(eduLevel =>
          EducationLevel.create({
            ...eduLevel,
            ...{ teacher_ID: teacherRecord.ID, identification_image_url: eduImgFileDTO[eduLevelDTO.indexOf(eduLevel)].location }
          })
        )
      );
      const teacherEduLevelRecord = await teacherRecord.getEducationLevels();
      return { statusCode: 201, result: teacherEduLevelRecord };
    } catch (err) {
      return { statusCode: 500, result: err };
    }
  }

  static async createCurriculum() {}
  static async updateCurriculum() {}
  static async createSchedule() {}
  static async updateSchedule() {}
}
