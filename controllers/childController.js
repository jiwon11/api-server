import childService from '../services/childService';
import parentService from '../services/parentService';

export const getAll = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    if (userRole !== 'parent') {
      return res.jsonResult(409, '사용자의 역할로는 자녀 정보를 조회할 수 없습니다.');
    } else {
      const parentData = await parentService.get(userId);
      if (parentData.statusCode !== 200) {
        return res.jsonResult(parentData.statusCode, parentData.result);
      } else {
        const childrenData = await childService.getAll(parentData.result.ID);
        return res.jsonResult(childrenData.statusCode, childrenData.result);
      }
    }
  } catch (err) {
    return res.jsonResult(500, result.errors);
  }
};

export const getOne = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    const childId = req.query.id;
    const hasChild = await parentService.hasChild(userId, childId);
    if (hasChild) {
      const childrenData = await childService.getOne(childId);
      return res.jsonResult(childrenData.statusCode, childrenData.result);
    } else {
      return res.jsonResult(409, '자녀 정보를 조회할 수 없습니다.');
    }
  } catch (err) {
    return res.jsonResult(500, result.errors);
  }
};

export const create = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    if (userRole !== 'parent') {
      return res.jsonResult(409, '사용자의 역할로는 자녀를 등록할 수 없습니다.');
    } else {
      const childDTO = req.body;
      if (typeof childDTO !== 'object') {
        return res.jsonResult(400, `${typeof childDTO}는 유효하지 않는 데이터 형태입니다.`);
      } else {
        const { statusCode, result } = await childService.create(userId, childDTO);
        return res.jsonResult(statusCode, result);
      }
    }
  } catch (err) {
    return res.jsonResult(500, result.errors);
  }
};

export const edit = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    if (userRole !== 'parent') {
      return res.jsonResult(409, '사용자의 역할로는 자녀 정보를 수정할 수 없습니다.');
    } else {
      const childId = req.query.id;
      const childEditDTO = req.body;
      if (typeof childEditDTO !== 'object') {
        return res.jsonResult(400, `${typeof childEditDTO}는 유효하지 않는 데이터 형태입니다.`);
      } else {
        const { statusCode, result } = await childService.edit(childId, childEditDTO);
        return res.jsonResult(statusCode, result);
      }
    }
  } catch (err) {
    return res.jsonResult(500, result.errors);
  }
};

export const remove = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    if (userRole !== 'parent') {
      return res.jsonResult(409, '사용자의 역할로는 자녀 정보를 삭제할 수 없습니다.');
    } else {
      const childId = req.query.id;
      const hasChild = await parentService.hasChild(userId, childId);
      if (hasChild) {
        const { statusCode, result } = await childService.remove(childId);
        return res.jsonResult(statusCode, result);
      } else {
        return res.jsonResult(409, '자녀 정보를 조회할 수 없습니다.');
      }
    }
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err);
  }
};
