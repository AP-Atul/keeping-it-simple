import dotenv from 'dotenv'
import _ from 'ramda'

dotenv.config()

const baseUrl = process.env.BASE_URL || '0.0.0.0:4000'

const config = {
  baseUrl,
  port: process.env.PORT || 4000,
  auth: {
    jwtsecret: process.env.JWT_SECRET || 'pp~f}dbkwd]k1qpp@n1<:lljptymffd]k1q~f}dbkwdt>',
    hashRounds: 10
  },
  storage: {
    buckets: {
      media: 'media'
    },
    maxSize: 1048576 * 2,
    local: {
      directory: 'user-media'
    },
    aws: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || ''
    }
  }
}

const prod = _.mergeRight(config, {
  db: {
    url: process.env.DB
  },
  storage: {
    ...config.storage,
    service: 'local'
  }
})

const test = _.mergeRight(config, {
  db: {
    url: process.env.DB_TEST
  },
  storage: {
    ...config.storage,
    service: 'aws'
  }
})

export = (function () {
  console.log(`Env= ${process.env.NODE_ENV}`)
  switch (process.env.NODE_ENV) {
    case 'production':
      return prod
    case 'test':
      return test
    default:
      return prod
  }
})()
