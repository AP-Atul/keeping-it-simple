import { expect } from 'chai'
import * as repo from '../../src/auth/repo'
import { TestServerEnvironment, getTestEnv } from '../environment'

let testEnv: TestServerEnvironment
const user = {
  first_name: 'random',
  last_name: 'random',
  email: 'random@gmail.com',
  password: 'randompassword'
}
const create = async () => {
  const response = await testEnv.server.inject({
    method: 'post',
    url: '/auth/signup',
    payload: user
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.result as any
}

beforeEach(async () => {
  testEnv = await getTestEnv()
  await testEnv.resetDB()
})

describe('auth signup apis', async () => {
  it('should return 400 for invalid data', async () => {
    const response = await testEnv.server.inject({
      method: 'post',
      url: '/auth/signup',
      payload: {
        first_name: 'random',
        last_name: 'random',
        email: 'random'
        // missing password
      }
    })
    expect(response.statusCode).eq(400)
  })
  it('should return 200 for successful signup', async () => {
    const response = await testEnv.server.inject({
      method: 'post',
      url: '/auth/signup',
      payload: {
        first_name: 'random',
        last_name: 'random',
        email: 'random@gmail.com',
        password: 'randompassword'
      }
    })
    expect(response.statusCode).eq(200)
  })
  it('should throw error if email exists', async () => {
    const user = {
      first_name: 'random',
      last_name: 'random',
      email: 'random@gmail.com',
      password: 'randompassword'
    }
    await repo.save(user)
    const response = await testEnv.server.inject({
      method: 'post',
      url: '/auth/signup',
      payload: user
    })
    expect(response.statusCode).eq(409)
    expect(response.result).contains({ code: 'email-exists' })
  })
})

describe('logout apis', async () => {
  it('should return 401 for non user', async () => {
    const user = await create()
    await repo.revokeAccess(user.user.id)
    const response = await testEnv.server.inject({
      method: 'delete',
      url: '/auth/logout',
      headers: {
        authorization: user?.auth_token
      }
    })
    expect(response.statusCode).eq(401)
  })
  it('should return 200', async () => {
    const user = await create()
    const response = await testEnv.server.inject({
      method: 'delete',
      url: '/auth/logout',
      headers: {
        authorization: user?.auth_token
      }
    })
    expect(response.statusCode).eq(200)
  })
})

describe('sign in apis', async () => {
  it('should return 401 for non user', async () => {
    const response = await testEnv.server.inject({
      method: 'post',
      url: '/auth/signin',
      payload: {
        email: user.email,
        password: user.password
      }
    })
    expect(response.statusCode).eq(401)
  })
  it('should return 401 for incorrect password', async () => {
    await create()
    const response = await testEnv.server.inject({
      method: 'post',
      url: '/auth/signin',
      payload: {
        email: user.email,
        password: user.password + 'a'
      }
    })
    expect(response.statusCode).eq(401)
  })
  it('should return 200 for valid user', async () => {
    await create()
    const response = await testEnv.server.inject({
      method: 'post',
      url: '/auth/signin',
      payload: {
        email: user.email,
        password: user.password
      }
    })
    expect(response.statusCode).eq(200)
  })
})

describe('refresh apis', async () => {
  it('should return 200 for valid user', async () => {
    const signin = await create()
    const response = await testEnv.server.inject({
      method: 'post',
      url: '/auth/refresh',
      payload: {
        refresh_token: signin.refresh_token
      }
    })
    expect(response.statusCode).eq(200)
  })
})
