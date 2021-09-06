import onepointService from '../services/onepointService';

export const create = async function (req, res) {
  try {
    const onepointDTO = { ...{ class: req.path.replace('/', '') }, ...req.body };
    const performanceVideoDTO = req.files;
    const { statusCode, result } = await onepointService.create(onepointDTO, performanceVideoDTO);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err);
  }
};

export const get = async function (req, res) {
  try {
    const onepointId = req.params.id;
    const { statusCode, result } = await onepointService.get(onepointId);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err);
  }
};
