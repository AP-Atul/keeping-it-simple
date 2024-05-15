import * as hapi from '@hapi/hapi'
import * as responses from './responses'

type Handler = (
  request: hapi.Request,
  h: hapi.ResponseToolkit
) => Promise<hapi.ResponseObject>

export const overlook =
  (handler: Handler) =>
  async (
    request: hapi.Request,
    h: hapi.ResponseToolkit
  ): Promise<hapi.ResponseObject> => {
    try {
      return await handler(request, h)
    } catch (err) {
      console.log('http-api-error : ', request.url.href, err)
      return responses.error(h, 'unknown-error', JSON.stringify(err))
    }
  }
