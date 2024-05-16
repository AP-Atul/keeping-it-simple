import * as hapi from '@hapi/hapi'
import * as responses from '../utils/responses'
import * as repo from './repo'
import { SearchTutor } from './types'

export const search = async (
  request: hapi.Request,
  h: hapi.ResponseToolkit
): Promise<hapi.ResponseObject> => {
  const options = request.query as SearchTutor
  const result = await repo.search(options)
  return responses.data(h, result)
}
