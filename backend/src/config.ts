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
  pagination: {
    limit: 20
  }
}

const prod = _.mergeRight(config, {
  db: {
    url: process.env.DB
  }
})

const test = _.mergeRight(config, {
  db: {
    url: process.env.DB_TEST
  }
})

export = (function () {
  switch (process.env.NODE_ENV) {
    case 'production':
      return prod
    case 'test':
      return test
    default:
      return prod
  }
})()
