import reviewService from "../service/review-service.js";

const get = async (req, res, next) => {
  try {
    const result = await reviewService.get();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await reviewService.getById(req.params.id);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const post = async (req, res, next) => {
  try {
    const result = await reviewService.post(req.body);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await reviewService.update(
      req.body,
      parseInt(req.params.id)
    );

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGuest = await reviewService.destroy(id);
    res.status(200).json({
      message: 'Review deleted successfully',
      data: deletedGuest,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete review',
      error: error.message,
    });
  }
};

export default {
  get,
  getById,
  post,
  update,
  destroy
};
