import * as hapi from '@hapi/hapi'
import bcrypt from 'bcrypt'
import moment from 'moment'
import * as _ from 'ramda'
import config from '../config'
import * as responses from '../utils/responses'
import * as repo from './repo'
import * as jwtTokens from './tokens'
import { SignUpUser } from './types'

export const signup = async (
  request: hapi.Request,
  h: hapi.ResponseToolkit
): Promise<hapi.ResponseObject> => {
  const payload = request.payload as SignUpUser
  const existing = await repo.getByEmail(payload.email)
  if (existing) {
    return responses.conflict(h, 'email-exists', 'email already exists')
  }
  const hashed = await bcrypt.hash(payload.password, config.auth.hashRounds)
  const user = await repo.save({ ...payload, password: hashed })
  const tokens = await jwtTokens.create(user)
  return responses.data(h, { ...tokens, user: _.omit(['password'], user) })
}

export const signin = async (
  request: hapi.Request,
  h: hapi.ResponseToolkit
): Promise<hapi.ResponseObject> => {
  const payload = request.payload as SignUpUser
  const existing = await repo.getByEmail(payload.email)
  if (_.isNil(existing)) {
    return responses.unauth(h, 'invalid-credentials')
  }
  const matched = await bcrypt.compare(payload.password, existing.password)
  if (!matched) {
    return responses.unauth(h, 'invalid-credentials')
  }

  const tokens = await jwtTokens.create(existing)
  return responses.data(h, { ...tokens, user: _.omit(['password'], existing) })
}

export const signinAnon = async (
  _: hapi.Request,
  h: hapi.ResponseToolkit
): Promise<hapi.ResponseObject> => {
  const tokens = await jwtTokens.createAnon()
  return responses.data(h, { ...tokens, })
}

export const logout = async (
  request: hapi.Request,
  h: hapi.ResponseToolkit
): Promise<hapi.ResponseObject> => {
  const session = request.auth.credentials.session
  await repo.revokeSession(session as string)
  return responses.message(h, 'logged-out', 'done')
}

export const refresh = async (
  request: hapi.Request,
  h: hapi.ResponseToolkit
): Promise<hapi.ResponseObject> => {
  const payload = request.payload as { refresh_token: string }
  const token = await repo.getRefreshToken(payload.refresh_token)
  if (!token) {
    return responses.unauth(h, 'invalid-credentials')
  }

  // someone is trying to use revoked token
  // clear all sessions and refresh tokens, let them login again
  if (token.revoked) {
    await repo.revokeAccess(token.user_id)
    return responses.unauth(h, 'invalid-credentials')
  }

  // refresh token is expired, revoke access, let them login again
  if (moment(token.expiry).isBefore(moment())) {
    await repo.revokeAccess(token.user_id)
    return responses.unauth(h, 'invalid-credentials')
  }

  // user is not real
  const user = await repo.getById(token.user_id)
  if (!user) {
    return responses.unauth(h, 'invalid-credentials')
  }

  // revoke old token, remove old session, create new tokens
  const tokens = await jwtTokens.create(user)
  await repo.revokeToken(payload.refresh_token)
  await repo.revokeSession(token.session_id)
  return responses.data(h, { ...tokens, user: _.omit(['password'], user) })
}
