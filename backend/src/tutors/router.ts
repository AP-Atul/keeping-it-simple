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

  server.route({
    method: 'get',
    path: '/tutors/{tutor}',
    options: {
      handler: overlook(handler.profile),
      tags: ['api', 'tutors', 'profile'],
      auth: {
        scope: ['anon']
      },
      validate: {
        params: schema.profile
      },
      description: 'Entire tutor profile',
      notes: 'Requires tutor id to be a path parameter'
    }
  })

  server.route({
    method: 'put',
    path: '/tutors/{tutor}/request',
    options: {
      handler: overlook(handler.request),
      tags: ['api', 'tutors', 'request'],
      auth: {
        scope: ['anon']
      },
      validate: {
        params: schema.profile,
        payload: schema.request
      },
      description: 'Make a tutor request',
      notes: 'Requires tutor id to be a path parameter'
    }
  })
}
