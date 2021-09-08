import onepointService from '../services/onepointService';

export const create = async function (req, res) {
  try {
    const onepointDTO = { ...{ class: req.path.split('/')[1] }, ...req.body };
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

export const edit = async function (req, res) {
  try {
    const onepointId = req.params.id;
    const performanceVideoDTO = req.files;
    const onepointDTO = { ...{ class: req.path.split('/')[1] }, ...req.body };
    const { statusCode, result } = await onepointService.edit(onepointId, onepointDTO, performanceVideoDTO);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err);
  }
};
