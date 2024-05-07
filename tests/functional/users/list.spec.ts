import { test } from '@japa/runner'

test.group('Users list', () => {
  test('Cannot List users without authenticate', async ({ client }) => {
    const response = await client.get('/users')

    response.assertStatus(401)
  })
})
