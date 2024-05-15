import { expect } from 'chai'
import { getTestEnv } from '../environment'

describe('swagger', async () => {
  let testEnv

  beforeEach(async () => {
    testEnv = await getTestEnv()
  })

  it('returns the swagger documentation', async () => {
    const swaggerUIResponse = await testEnv.server.inject({
      method: 'get',
      url: '/documentation'
    })
    expect(swaggerUIResponse.statusCode).eq(200)

    const response = await testEnv.server.inject({
      method: 'get',
      url: '/swagger.json'
    })
    expect(response.statusCode).eq(200)
  })
})
