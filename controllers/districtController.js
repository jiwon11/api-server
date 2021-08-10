import districtService from '../services/districtService';

export const search = async function (req, res) {
  try {
    const query = req.query.q;
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const { statusCode, result } = await districtService.search(query, limit, offset);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    return res.jsonResult(500, err);
  }
};

export const getAll = async function (req, res) {
  try {
    const limit = parseInt(req.query.limit);
    const offset = parseInt(req.query.offset);
    const { statusCode, result } = await districtService.getAll(limit, offset);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    return res.jsonResult(500, err);
  }
};
