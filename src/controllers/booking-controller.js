import bookingService from '../service/booking-service.js';
const get = async (req, res, next) => {
  try {
    const result = await bookingService.get();
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await bookingService.getById(req.params.id);

    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const post = async (req, res, next) => {
  try {
    const result = await bookingService.post(req.body, req.file);
    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await bookingService.update(
      req.body,
      req.file,
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
    const deletedGuest = await bookingService.destroy(id);
    res.status(200).json({
      message: 'Facility deleted successfully',
      data: deletedGuest,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete facility',
      error: error.message,
    });
  }
};
export default {
  get,
  post,
  getById,
  update,
  destroy
};
