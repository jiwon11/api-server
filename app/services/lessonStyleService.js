import LessonStyleModel from '../models/lesson_style';
import TagService from './tagService';

export default class lessonStyleService extends TagService {
  static async create(instrumentDTO) {
    try {
      return super.create(LessonStyleModel, instrumentDTO);
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async getAll() {
    try {
      return super.getAll(LessonStyleModel);
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }
}
