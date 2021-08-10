import teacherService from '../services/teacherService';

export const getTeachers = async function (req, res) {
  try {
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
