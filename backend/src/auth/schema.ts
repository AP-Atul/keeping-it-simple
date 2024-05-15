import joi from 'joi'

export const signup = joi
  .object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required()
  })
  .label('User sign up')

export const signin = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().required()
  })
  .label('User sign in')

export const refresh = joi
  .object({
    refresh_token: joi.string().required()
  })
  .label('Auth refresh')
