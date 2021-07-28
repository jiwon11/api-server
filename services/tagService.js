export default class TagService {
  static async create(TagModel, tagDTO) {
    try {
      const tagRecord = await TagModel.create(tagDTO);
      return { statusCode: 201, result: tagRecord };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async getAll(TagModel) {
    try {
      const tagRecord = await TagModel.findAll({ attributes: ['ID', 'name'] });
      return { statusCode: 200, result: tagRecord };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }
}
