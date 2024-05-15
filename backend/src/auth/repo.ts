import db from '../db/db'
import {
  ReFreshToken,
  SaveRefreshToken,
  SaveSession,
  Session,
  SignUpUser,
  User
} from './types'

const table = 'auth.users'
const sessionTable = 'auth.sessions'
const tokensTable = 'auth.refresh_tokens'

export const getByEmail = async (email: string): Promise<User | undefined> => {
  return await db<User>(table).select('*').where('email', '=', email).first()
}

export const getById = async (id: string): Promise<User | undefined> => {
  return await db<User>(table).select('*').where('id', '=', id).first()
}

export const save = async (user: SignUpUser): Promise<User> => {
  return await db<User>(table)
    .insert(user)
    .returning('*')
    .then((rows) => rows[0])
}

export const saveSession = async (session: SaveSession): Promise<Session> => {
  return await db(sessionTable)
    .insert(session)
    .returning('*')
    .then((rows) => rows[0])
}

export const saveRefreshToken = async (
  token: SaveRefreshToken
): Promise<ReFreshToken> => {
  return await db(tokensTable)
    .insert(token)
    .returning('*')
    .then((rows) => rows[0])
}

export const getSession = async (id: string): Promise<Session | undefined> => {
  return await db<Session>(sessionTable).select('*').where('id', '=', id).first()
}

export const setLastUsed = async (session: Session): Promise<void> => {
  await db<Session>(sessionTable)
    .update({ last_used_at: new Date().toISOString() })
    .where('id', '=', session.id)
}

export const revokeSession = async (id: string): Promise<void> => {
  await db(sessionTable).delete().where('id', '=', id)
}

export const getRefreshToken = async (id: string): Promise<ReFreshToken | undefined> => {
  return await db<ReFreshToken>(tokensTable).select('*').where('id', '=', id).first()
}

export const revokeToken = async (id: string): Promise<void> => {
  await db<ReFreshToken>(tokensTable)
    .update({
      revoked: true
    })
    .where('id', '=', id)
}

export const revokeAccess = async (userId: string): Promise<void> => {
  await db<ReFreshToken>(tokensTable).delete().where('user_id', '=', userId)
  await db<Session>(sessionTable).delete().where('user_id', '=', userId)
}
