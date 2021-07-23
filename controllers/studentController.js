import studentService from '../services/studentService';
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
        const studentsData = await studentService.getAll(parentData.result.ID);
        return res.jsonResult(studentsData.statusCode, studentsData.result);
      }
    }
  } catch (err) {
    return res.jsonResult(500, err.message);
  }
};

export const add = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    if (userRole !== 'parent') {
      return res.jsonResult(409, '사용자의 역할로는 자녀를 등록할 수 없습니다.');
    } else {
      const studentDTO = req.body;
      if (typeof studentDTO !== 'object') {
        return res.jsonResult(400, `${typeof studentDTO}는 유효하지 않는 데이터 형태입니다.`);
      } else {
        const { statusCode, result } = await studentService.add(userId, studentDTO);
        return res.jsonResult(statusCode, result);
      }
    }
  } catch (err) {
    return res.jsonResult(500, err.message);
  }
};

export const edit = async function (req, res) {
  try {
    const userId = req.user.ID;
    const userRole = req.user.role;
    if (userRole !== 'parent') {
      return res.jsonResult(409, '사용자의 역할로는 자녀 정보를 수정할 수 없습니다.');
    } else {
      const studentId = req.query.id;
      const studentEditDTO = req.body;
      if (typeof studentEditDTO !== 'object') {
        return res.jsonResult(400, `${typeof studentEditDTO}는 유효하지 않는 데이터 형태입니다.`);
      } else {
        const { statusCode, result } = await studentService.edit(studentId, studentEditDTO);
        return res.jsonResult(statusCode, result);
      }
    }
  } catch (err) {
    return res.jsonResult(500, err.message);
  }
};
