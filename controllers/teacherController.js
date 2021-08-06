import teacherService from '../services/teacherService';

export const createProfile = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    const careerDTO = req.body.careers;
    const hopeDistrictDTO = req.body.hopeDistricts;
    const instrumentDTO = req.body.instruments;
    const lessonStyleDTO = req.body.lesson_styles;
    const lessonPlaceDTO = req.body.lesson_places;
    const teacherDTO = req.body.profile;
    const { statusCode, result } = await teacherService.createProfile(userId, teacherDTO, careerDTO, hopeDistrictDTO, instrumentDTO, lessonStyleDTO, lessonPlaceDTO);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err);
  }
};

export const uploadCoverImgs = async function (req, res) {
  try {
    const teacherId = req.query.id;
    const imgFileDTO = req.files;
    const coverImgDTO = Object.values(imgFileDTO).flat();
    const { statusCode, result } = await teacherService.uploadCoverImgs(teacherId, coverImgDTO);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err);
  }
};

export const uploadPerformanceVideos = async function (req, res) {
  try {
    const teacherId = req.query.id;
    const performanceVideoDTO = req.body.performanceVideos;
    const { statusCode, result } = await teacherService.uploadPerformanceVideos(teacherId, performanceVideoDTO);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err);
  }
};

export const uploadEduLevel = async function (req, res) {
  try {
    const userId = req.user.ID;
    const eduImgFileDTO = req.files;
    const eduLevelDTO = JSON.parse(req.body.eduLevels);
    const { statusCode, result } = await teacherService.uploadEduLevel(userId, eduImgFileDTO, eduLevelDTO);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err.message);
  }
};

export const getAll = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const district = req.query.district;
    const instrument = parseInt(req.query.instrument);
    const order = req.query.order;
    if (['created', 'popular'].includes(order)) {
      const { statusCode, result } = await teacherService.getAll(limit, offset, order, district, instrument);
      return res.jsonResult(statusCode, result);
    } else {
      return res.jsonResult(401, `유효하지 않는 Query 입니다. 가능 Query: created, popular 입력한 Query: ${req.query.order}`);
    }
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err);
  }
};

export const getProfile = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    const targetTeacherId = req.query.id;
    const { statusCode, result } = await teacherService.getProfile(targetTeacherId);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err);
  }
};
