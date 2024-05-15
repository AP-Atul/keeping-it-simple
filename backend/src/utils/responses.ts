import * as hapi from '@hapi/hapi'
import { AuthAPIResponseCodes } from 'src/auth/types'

export type Code = AuthAPIResponseCodes | 'unknown-error'

export const data = (h: hapi.ResponseToolkit, data: object): hapi.ResponseObject => {
  return h.response(data).code(200)
}

export const error = (
  h: hapi.ResponseToolkit,
  code: Code,
  error: string
): hapi.ResponseObject => {
  return h.response({ code, error }).code(400)
}

export const conflict = (
  h: hapi.ResponseToolkit,
  code: Code,
  message?: string
): hapi.ResponseObject => {
  return h.response({ code, message }).code(409)
}

export const unauth = (
  h: hapi.ResponseToolkit,
  code: Code,
  message?: string
): hapi.ResponseObject => {
  return h.response({ code, message }).code(401)
}

export const notfound = (
  h: hapi.ResponseToolkit,
  code: Code,
  error?: string
): hapi.ResponseObject => {
  return h.response({ code, error }).code(404)
}

export const message = (
  h: hapi.ResponseToolkit,
  code: Code,
  message: string
): hapi.ResponseObject => {
  return h.response({ code, message }).code(200)
}
