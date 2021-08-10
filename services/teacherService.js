import TeacherModel from '../models/teacher';
import CoverImg from '../models/cover_img';
import Career from '../models/career';
import EducationLevel from '../models/education_level';

export default class teacherService {
  static async createProfile(userId, teacherDTO, careerDTO, hopeDistrictDTO, instrumentDTO, lessonStyleDTO, lessonPlaceDTO) {
    try {
      const createdTeacher = await TeacherModel.create({
        ...teacherDTO,
        ...{
          user_ID: userId
        }
      });
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
      await createdTeacher.addInstruments(instrumentDTO);
      await createdTeacher.addTeacherLessonStyle(lessonStyleDTO);
      await createdTeacher.addLessonPlaces(lessonPlaceDTO);
      console.timeEnd('addDistricts');
      const teacherRecord = await TeacherModel.getTeacherProfile(createdTeacher.ID);
      return { statusCode: 201, result: teacherRecord };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async uploadCoverImgs(teacherId, coverImgDTO) {
    try {
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
            teacher_ID: teacherId
          })
        )
      );
      console.timeEnd('createCoverImg');
      const teacherCoverImgRecord = await CoverImg.getOnlyImgs(teacherId);
      return { statusCode: 201, result: teacherCoverImgRecord };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async uploadPerformanceVideos(teacherId, performanceVideoDTO) {
    try {
      console.time('createPerformanceVideo');
      await Promise.all(
        performanceVideoDTO.map(performanceVideo =>
          CoverImg.create({
            name: 'performanceVideo',
            mime_type: 'video/mp4',
            url: performanceVideo.url,
            size: 0,
            width: 0,
            height: 0,
            teacher_ID: teacherId
          })
        )
      );
      console.timeEnd('createPerformanceVideo');
      const teacherPerformanceVideoRecord = await CoverImg.findAll({ where: { teacher_ID: teacherId, name: 'performanceVideo' }, attributes: CoverImg.getAttributes });
      return { statusCode: 201, result: teacherPerformanceVideoRecord };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async getAll(limit, offset, order, district, instrument) {
    try {
      const teacherRecord = await TeacherModel.getAll(limit, offset, order, district, instrument);
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
            ...{ teacher_ID: teacherRecord.ID, certificate_img: eduImgFileDTO[eduLevelDTO.indexOf(eduLevel)].location }
          })
        )
      );
      const teacherEduLevelRecord = await teacherRecord.getEducationLevels({ attributes: EducationLevel.getAttributes(true) });
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
