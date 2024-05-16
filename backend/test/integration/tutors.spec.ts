import { expect } from 'chai'
import config from '../../src/config'
import { Tutor } from '../../src/tutors/types'
import { TestServerEnvironment, createSampleTutor, getTestEnv } from '../environment'

let env: TestServerEnvironment
const signin = async () => {
  const response = await env.server.inject({
    method: 'post',
    url: '/auth/anon-signin'
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return response.result as any
}

beforeEach(async () => {
  env = await getTestEnv()
  await env.resetDB()
})

// todo: add more tests for each param
describe('tutor search api', () => {
  it('should list tutors with simple query', async () => {
    const auth = await signin()
    const tutor = await createSampleTutor({ first_name: 'random' })
    const response = await env.server.inject<Tutor[]>({
      method: 'get',
      url: `/tutors/search?query=ran`,
      headers: {
        authorization: auth.auth_token
      }
    })
    expect(response.statusCode).eq(200)
    expect(response.result![0].id).eq(tutor.id)
  })
  it('should list tutors with simple query and price', async () => {
    const auth = await signin()
    const tutor = await createSampleTutor({ first_name: 'random', price: 'gold' })
    await createSampleTutor({ price: 'premium' })
    const response = await env.server.inject<Tutor[]>({
      method: 'get',
      url: `/tutors/search?query=ran&price=gold`,
      headers: {
        authorization: auth.auth_token
      }
    })
    expect(response.statusCode).eq(200)
    expect(response.result).length(1)
    expect(response.result![0].id).eq(tutor.id)
  })
})

describe('tutor pagination', () => {
  it('should respect pagination parameters', async () => {
    // creating random tutors
    await Promise.all(
      Array(50)
        .fill(null)
        .map(() => createSampleTutor())
    )
    const auth = await signin()
    const response = await env.server.inject<Tutor[]>({
      method: 'get',
      url: `/tutors/search`,
      headers: {
        authorization: auth.auth_token
      }
    })
    expect(response.statusCode).eq(200)
    expect(response.result).length(config.pagination.limit)
  })
})
