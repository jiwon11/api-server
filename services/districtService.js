import DistrictModel from '../models/district';
export default class districtService {
  static async search(query, limit, offset) {
    try {
      const districtRecord = await DistrictModel.searchAll(query, limit, offset);
      return { statusCode: 200, result: districtRecord };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async getAll(limit, offset) {
    try {
      const districtRecord = await DistrictModel.findAll({ attributes: DistrictModel.getAttributes, limit: limit, offset: offset });
      return { statusCode: 200, result: districtRecord };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }
}
