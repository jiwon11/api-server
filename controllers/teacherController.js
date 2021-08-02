import teacherService from '../services/teacherService';

export const createProfile = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    const imgFileDTO = req.files;
    const coverImgDTO = Object.values(imgFileDTO).flat();
    const performanceVideoDTO = JSON.parse(req.body.performanceVideo);
    const careerDTO = JSON.parse(req.body.careers);
    const hopeDistrictDTO = JSON.parse(req.body.hopeDistricts);
    const teacherDTO = JSON.parse(req.body.profile);
    const { statusCode, result } = await teacherService.createProfile(userId, teacherDTO, coverImgDTO, performanceVideoDTO, careerDTO, hopeDistrictDTO);
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
    const eduLevelDTO = JSON.parse(req.body.eduLevel);
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
    const { statusCode, result } = await teacherService.getAll(limit, offset);
    return res.jsonResult(statusCode, result);
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
