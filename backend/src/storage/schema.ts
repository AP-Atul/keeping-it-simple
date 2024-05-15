import joi from 'joi'

export const upload = joi
  .object({
    file: joi.any().meta({ swaggerType: 'file' })
  })
  .label('File Upload')
