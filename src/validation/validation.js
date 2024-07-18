import responseError from "../error/error.js";

const validation = async (schema, data) => {
  const validate = await schema.validate(data);

  if (validate.error) {
    throw new responseError(400, validate.error.message);
  } else {
    return validate.value;
  }
};

export default validation;
