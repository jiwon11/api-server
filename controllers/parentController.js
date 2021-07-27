import parentService from '../services/parentService';

export const create = async function (req, res) {
  try {
    console.log(req.user);
    const userId = req.user.ID;
    const parentDTO = req.body;
    const { statusCode, result } = await parentService.create(userId, parentDTO);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err);
  }
};
