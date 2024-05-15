import { expect } from 'chai'
import FormData from 'form-data'
import fs from 'fs'
import { TestServerEnvironment, getTestEnv } from '../environment'

let testEnv: TestServerEnvironment
const user = {
  first_name: 'random',
  last_name: 'random',
  email: 'random@gmail.com',
  password: 'randompassword'
}
const filename = 'random.txt'
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
  fs.writeFileSync(filename, 'this is some data')
})

afterEach(async () => {
  fs.unlinkSync(filename)
})

describe('files apis', async () => {
  it('should upload the file', async () => {
    const form = new FormData()
    form.append('file', fs.readFileSync(filename, 'utf-8'), { filename: 'random.txt' })
    const user = await create()
    const response = await testEnv.server.inject({
      method: 'post',
      url: '/storage/upload',
      payload: form.getBuffer(),
      headers: {
        authorization: user.auth_token,
        ...form.getHeaders()
      }
    })
    expect(response.statusCode).eq(200)
  })
  it('should fail to upload the file', async () => {
    const form = new FormData()
    form.append('file', fs.readFileSync(filename, 'utf-8'), { filename: 'fail.txt' })
    const user = await create()
    const response = await testEnv.server.inject({
      method: 'post',
      url: '/storage/upload',
      payload: form.getBuffer(),
      headers: {
        authorization: user.auth_token,
        ...form.getHeaders()
      }
    })
    expect(response.statusCode).eq(400)
  })
})
