import LessonPlaceModel from '../models/lesson_place';
import TagService from './tagService';

export default class lessonPlaceService extends TagService {
  static async create(instrumentDTO) {
    try {
      return super.create(LessonPlaceModel, instrumentDTO);
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async getAll() {
    try {
      return super.getAll(LessonPlaceModel);
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }
}
