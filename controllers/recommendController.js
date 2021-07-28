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
