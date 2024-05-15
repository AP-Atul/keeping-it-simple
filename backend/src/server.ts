import * as hapi from '@hapi/hapi'
import * as inert from '@hapi/inert'
import * as vision from '@hapi/vision'
import * as jwt2 from 'hapi-auth-jwt2'
import * as swagger from 'hapi-swagger'
import * as auth from './auth/router'
import * as jwtTokenValidator from './auth/tokens'
import config from './config'
import * as diagnostic from './diagnostic/router'

export const init = async (): Promise<hapi.Server> => {
  // Hapi JS server initialization
  const server = hapi.server({
    port: config.port,
    host: '0.0.0.0',
    routes: {
      cors: {
        origin: ['*']
        // an array of origins or 'ignore',
      }
    }
  })

  // Swagger configuration
  const swaggerOptions = {
    info: {
      title: 'Hapi API Documentation',
      version: '0.0.1'
    },
    host: `${config.baseUrl}`,
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    security: [{ jwt: [] }]
  }

  await server.register([
    inert,
    vision,
    {
      plugin: swagger,
      options: swaggerOptions
    },
    {
      plugin: jwt2
    }
  ])

  // authorization
  server.auth.strategy('jwt', 'jwt', {
    key: config.auth.jwtsecret,
    validate: jwtTokenValidator.validate
  })
  server.auth.default('jwt')

  // initialize routers
  diagnostic.register(server)
  auth.register(server)

  await server.initialize()
  return server
}
