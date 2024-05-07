import { test } from '@japa/runner'

test.group('Api', () => {
  test('Should be running', async ({ client }) => {
    const response = await client.get('/')

    response.assertStatus(200)

    response.assertBodyContains({ status: 'The api are running' })
  })
})
