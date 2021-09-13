import OnepointModel from '../models/onepoint';
import OnepointPerformanceModel from '../models/onepoint_performance';

export default class onepointService {
  static async create(onepointDTO, performanceDTO) {
    try {
      const createdOnepoint = await OnepointModel.create(onepointDTO);
      if (performanceDTO) {
        await Promise.all(
          performanceDTO.map(performanceMedia =>
            OnepointPerformanceModel.create({
              name: performanceMedia.fieldname,
              mime_type: performanceMedia.mimetype,
              url: performanceMedia.location,
              size: performanceMedia.size,
              width: 0,
              height: 0,
              onepoint_ID: createdOnepoint.ID,
              index: performanceDTO.indexOf(performanceMedia)
            })
          )
        );
      } else {
        return { statusCode: 404, result: '연주 영상이 없습니다.' };
      }
      return { statusCode: 201, result: { id: createdOnepoint.ID } };
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async get(onepointId) {
    try {
      const onepointRecords = await OnepointModel.findOne({
        where: { ID: onepointId },
        attributes: OnepointModel.getAttributes,
        include: {
          model: OnepointPerformanceModel,
          attributes: OnepointPerformanceModel.getAttributes,
          order: [['index', 'desc']]
        }
      });
      if (onepointRecords) {
        return { statusCode: 200, result: onepointRecords };
      } else {
        return { statusCode: 404, result: `id 값으로 ${onepointId}를 가진 레슨 요청 레코드가 존재하지 않습니다.` };
      }
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }

  static async edit(onepointId, onepointDTO, performanceDTO) {
    try {
      const onepointRecords = await OnepointModel.findOne({
        where: { ID: onepointId }
      });
      if (onepointRecords) {
        await onepointRecords.update(onepointDTO);
        if (performanceDTO) {
          await OnepointPerformanceModel.destroy({ where: { onepoint_ID: onepointRecords.ID } });
          await Promise.all(
            performanceDTO.map(performanceMedia =>
              OnepointPerformanceModel.create({
                name: performanceMedia.fieldname,
                mime_type: performanceMedia.mimetype,
                url: performanceMedia.location,
                size: performanceMedia.size,
                width: 0,
                height: 0,
                onepoint_ID: onepointRecords.ID,
                index: performanceDTO.indexOf(performanceMedia)
              })
            )
          );
        } else {
          return { statusCode: 404, result: '연주 영상이 없습니다.' };
        }
        return { statusCode: 201, result: { id: onepointRecords.ID } };
      } else {
        return { statusCode: 404, result: `id 값으로 ${onepointId}를 가진 레슨 요청 레코드가 존재하지 않습니다.` };
      }
    } catch (err) {
      console.log(err);
      return { statusCode: 500, result: err };
    }
  }
}
