import * as hapi from '@hapi/hapi'
import { StorageService } from 'src/integrations/storage/storage_service'
import config from '../config'
import { overlook } from '../utils/errors'
import * as handler from './handler'
import * as schema from './schema'

export const register = (server: hapi.Server, storage: StorageService): void => {
  server.route({
    method: 'post',
    path: '/storage/upload',
    options: {
      handler: overlook(handler.upload(storage, config.storage.buckets.media)),
      auth: {
        scope: ['investor']
      },
      payload: {
        maxBytes: config.storage.maxSize,
        output: 'stream',
        multipart: {
          output: 'stream'
        },
        allow: 'multipart/form-data'
      },
      validate: {
        payload: schema.upload
      },
      tags: ['api', 'file'],
      description: 'Upload file'
    }
  })
}
