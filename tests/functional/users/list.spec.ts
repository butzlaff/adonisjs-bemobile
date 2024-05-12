import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

test.group('Users list', (group) => {
  group.setup(() => testUtils.db().seed())
  test('Cannot List users without authenticate', async ({ client }) => {
    const login = await client.post('/login').json({
      email: 'user@test.com',
      password: '123456',
    })
    const { token } = login.body()

    const response = await client.get('/users').bearerToken(token)

    response.assertStatus(200)
    response.assertBody([{ id: 1, email: 'user@test.com' }])
    response.assertBodyNotContains({ id: 2, email: 'invaliduserteste.com' })
  })
})
