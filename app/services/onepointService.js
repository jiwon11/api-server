import OnepointModel from '../models/onepoint';
import OnepointPerformanceVideoModel from '../models/onepoint_performance_video';

export default class onepointService {
  static async create(onepointDTO, performanceVideoDTO) {
    try {
      const createdOnepoint = await OnepointModel.create(onepointDTO);
      await Promise.all(
        performanceVideoDTO.map(performanceVideo =>
          OnepointPerformanceVideoModel.create({
            name: performanceVideo.fieldname,
            mime_type: performanceVideo.mimetype,
            url: performanceVideo.location,
            size: performanceVideo.size,
            width: 0,
            height: 0,
            onepoint_ID: createdOnepoint.ID
          })
        )
      );
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
          model: OnepointPerformanceVideoModel,
          attributes: OnepointPerformanceVideoModel.getAttributes
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
}
