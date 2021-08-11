import instrumentService from '../services/instrumentService';
import lessonPlaceService from '../services/lessonPlaceService';
import lessonStyleService from '../services/lessonStyleService';

export const instrumentCreate = async function (req, res) {
  try {
    const instrumentDTO = req.body;
    const { statusCode, result } = await instrumentService.create(instrumentDTO);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    return res.jsonResult(500, err);
  }
};

export const instrumentGetAll = async function (req, res) {
  try {
    const { statusCode, result } = await instrumentService.getAll();
    return res.jsonResult(statusCode, result);
  } catch (err) {
    return res.jsonResult(500, err);
  }
};

export const lessonStyleCreate = async function (req, res) {
  try {
    const instrumentDTO = req.body;
    const { statusCode, result } = await lessonStyleService.create(instrumentDTO);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err);
  }
};

export const lessonStyleGetAll = async function (req, res) {
  try {
    const { statusCode, result } = await lessonStyleService.getAll();
    return res.jsonResult(statusCode, result);
  } catch (err) {
    return res.jsonResult(500, err);
  }
};

export const lessonPlaceCreate = async function (req, res) {
  try {
    const instrumentDTO = req.body;
    const { statusCode, result } = await lessonPlaceService.create(instrumentDTO);
    return res.jsonResult(statusCode, result);
  } catch (err) {
    console.log(err);
    return res.jsonResult(500, err);
  }
};

export const lessonPlaceGetAll = async function (req, res) {
  try {
    const { statusCode, result } = await lessonPlaceService.getAll();
    return res.jsonResult(statusCode, result);
  } catch (err) {
    return res.jsonResult(500, err);
  }
};
