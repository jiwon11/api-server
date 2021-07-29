import recommendService from '../services/recommendService';

export const createRequest = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    const requestRecommendDTO = req.body;
    const { statusCode, result } = await recommendService.createRequest(userId, requestRecommendDTO);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    return res.jsonResult(500, err);
  }
};

export const getRequests = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
    const requestId = req.query.id ? req.query.id : undefined;
    const { statusCode, result } = await recommendService.getRequests(requestId, limit, offset);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    return res.jsonResult(500, err);
  }
};

export const confirmRequest = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    const recommendTeacherDTO = req.body;
    const requestId = req.query.id;
    const { statusCode, result } = await recommendService.confirmRequest(requestId, recommendTeacherDTO);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    return res.jsonResult(500, err);
  }
};
