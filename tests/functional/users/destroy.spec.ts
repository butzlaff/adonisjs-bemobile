import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Users destroy', (group) => {
  group.teardown(() => testUtils.db().truncate())
  group.teardown(() => testUtils.db().seed())
  test('Should delete a User sucessfully', async ({ client }) => {
    const login = await client.post('/login').json({
      email: 'user@test.com',
      password: '123456',
    })
    const { token } = login.body()

    const response = await client.delete('/users/1').bearerToken(token)

    response.assertStatus(204)
  })
})
