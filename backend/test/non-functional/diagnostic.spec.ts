import { expect } from 'chai'
import { getTestEnv } from '../environment'

describe('diagnostic', async () => {
  let testEnv

  beforeEach(async () => {
    testEnv = await getTestEnv()
  })

  it('respond to ping', async () => {
    const response = await testEnv.server.inject({
      method: 'get',
      url: '/internal/ping'
    })
    expect(response.statusCode).eq(200)
  })
})
