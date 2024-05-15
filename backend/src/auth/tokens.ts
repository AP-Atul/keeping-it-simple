import jwt from 'jsonwebtoken'
import moment from 'moment'
import * as _ from 'ramda'
import config from '../config'
import * as repo from './repo'
import { User } from './types'

interface Result {
  isValid: boolean
}

interface Tokens {
  auth_token: string
  refresh_token: string
}

interface Decoded {
  user: string
  session: string
  scope: string[]
  iat: number
}

export const validate = async (decoded: Decoded): Promise<Result> => {
  if (_.isNil(decoded.session) || _.isNil(decoded.user)) {
    return { isValid: false }
  }
  const session = await repo.getSession(decoded.session)
  if (!session) {
    return { isValid: false }
  }
  await repo.setLastUsed(session)
  return { isValid: true }
}

export const create = async (
  user: User,
  expiry: 'short' | 'long' = 'short'
): Promise<Tokens> => {
  const session = await repo.saveSession({ user_id: user.id })
  const auth = jwt.sign(
    {
      user: user.id,
      session: session.id,
      scope: user.roles.split(' ')
    },
    config.auth.jwtsecret,
    {
      expiresIn: expiry === 'short' ? '59m' : '1d'
    }
  )
  const refresh = await repo.saveRefreshToken({
    user_id: user.id,
    session_id: session.id,
    expiry: moment().add(1, 'd').toISOString()
  })
  return { auth_token: auth, refresh_token: refresh.id }
}
