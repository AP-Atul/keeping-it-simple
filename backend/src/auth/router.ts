import * as hapi from '@hapi/hapi'
import { overlook } from '../utils/errors'
import * as handler from './handler'
import * as schema from './schema'

export const register = (server: hapi.Server): void => {
  server.route({
    method: 'post',
    path: '/auth/signup',
    options: {
      handler: overlook(handler.signup),
      tags: ['api', 'auth'],
      auth: false,
      validate: {
        payload: schema.signup
      },
      description: 'Returns auth tokens',
      notes: 'Fails with 400; if data is invalid'
    }
  })

  server.route({
    method: 'post',
    path: '/auth/signin',
    options: {
      handler: overlook(handler.signin),
      tags: ['api', 'auth'],
      auth: false,
      validate: {
        payload: schema.signin
      },
      description: 'Returns auth tokens',
      notes: 'Fails with 401; if data is invalid'
    }
  })

  server.route({
    method: 'delete',
    path: '/auth/logout',
    options: {
      handler: handler.logout,
      tags: ['api', 'auth'],
      auth: {
        mode: 'required'
      },
      description: 'Returns 200'
    }
  })

  server.route({
    method: 'post',
    path: '/auth/refresh',
    options: {
      handler: overlook(handler.refresh),
      tags: ['api', 'auth'],
      auth: false,
      validate: {
        payload: schema.refresh
      },
      description: 'Returns auth tokens',
      notes: 'Fails with 401; if data is invalid'
    }
  })

  server.route({
    method: 'post',
    path: '/auth/anon-signin',
    options: {
      handler: overlook(handler.signinAnon),
      tags: ['api', 'auth', 'anon'],
      auth: false,
      description: 'Returns auth tokens for anon user',
      notes: 'Fails with 401; if data is invalid'
    }
  })
}
