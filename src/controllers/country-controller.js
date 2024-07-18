import countryService from "../service/country-service.js";

const get = async (req, res, next) => {
  try {
    const result = await countryService.get();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
    try {
      const result = await countryService.getById(req.params.id);

      res.status(200).json({
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

export default {
  get,
  getById
};
