import DistrictModel from '../models/district';

export default class districtService {
  static async search(query, limit, offset) {
    try {
      const districtRecord = await DistrictModel.findAll({
        where: {
          [Op.or]: [
            {
              si_do: {
                [Op.like]: `%${query}%`
              }
            },
            {
              si_gun_gu: {
                [Op.like]: `%${query}%`
              }
            },
            {
              eup_myeon_dong: {
                [Op.like]: `%${query}%`
              }
            }
          ]
        },
        attributes: ['ID', 'si_do', 'si_gun_gu', 'eup_myeon_dong'],
        limit: limit,
        offset: offset
      });
      return { statusCode: 200, result: districtRecord };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async getAll(limit, offset) {
    try {
      const districtRecord = await DistrictModel.findAll({ attributes: ['ID', 'si_do', 'si_gun_gu', 'eup_myeon_dong'], limit: limit, offset: offset });
      return { statusCode: 200, result: districtRecord };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }
}
