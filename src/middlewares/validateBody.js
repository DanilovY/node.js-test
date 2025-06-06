import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (e) {
    const err = createHttpError(400, 'Bad Request', {
      errors: e.details,
    });
    next(err);
  }
};
