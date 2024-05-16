import * as hapi from '@hapi/hapi'
import { overlook } from '../utils/errors'
import * as handler from './handler'
import * as schema from './schema'

export const register = (server: hapi.Server): void => {
  server.route({
    method: 'get',
    path: '/tutors/search',
    options: {
      handler: overlook(handler.search),
      tags: ['api', 'tutors', 'search'],
      auth: {
        scope: ['anon']
      },
      validate: {
        query: schema.search
      },
      description: 'Search tutors with filter options',
      notes: 'All fields are optional, default sorting = atar_desc'
    }
  })
}
