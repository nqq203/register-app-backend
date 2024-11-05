import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(5432),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_NAME: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision').default('development'),
  TYPEORM_SYNC: Joi.boolean().default(false).truthy('true').truthy('1').falsy('false').falsy('0').required(),
});
