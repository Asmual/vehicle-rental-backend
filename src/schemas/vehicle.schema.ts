import Joi from 'joi';

export const createVehicleSchema = Joi.object({
  name: Joi.string().required(),
  plate_number: Joi.string().required(),
  category: Joi.string().required(),
  daily_rate: Joi.number().positive().required(),
  photo_path: Joi.string().optional()
});