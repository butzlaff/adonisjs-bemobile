import { test } from '@japa/runner'

test.group('Authenticate', () => {
  test('Should authenticated a valid user', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'user@test.com',
      password: '123456',
    })

    response.assertStatus(200)
  })
  test('Should not authenticate a invalid user', async ({ client }) => {
    const response = await client.post('/login').json({
      email: 'wrong_user@test.com',
      password: '1234561',
    })
    response.assertStatus(401)

    response.assertBody({ error: 'Invalid credentials' })
  })
})
