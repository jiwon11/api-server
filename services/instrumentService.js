import InstrumentModel from '../models/instrument';
import TagService from './tagService';

export default class instrumentService extends TagService {
  static async create(instrumentDTO) {
    try {
      return super.create(InstrumentModel, instrumentDTO);
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async getAll() {
    try {
      return super.getAll(InstrumentModel);
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }
}
