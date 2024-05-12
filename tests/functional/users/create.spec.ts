import { test } from '@japa/runner'

test.group('Users create', () => {
  test('Should create a User', async ({ client }) => {
    const response = await client.post('/users').json({
      email: 'user_valid@test.com',
      password: '123456',
    })

    response.assertStatus(201)
    response.assertBodyContains({
      email: 'user_valid@test.com',
      id: 2,
    })
  })

  test('Should not create a User with invalid email', async ({ client }) => {
    const response = await client.post('/users').json({
      email: 'user_invalidtest.com',
      password: '123456',
    })

    response.assertStatus(422)
    response.assertBody({
      errors: [
        {
          field: 'email',
          message: 'The email field must be a valid email address',
          rule: 'email',
        },
      ],
    })
  })

  test('Should not create a User without password', async ({ client }) => {
    const response = await client.post('/users').json({
      email: 'user_invalid@test.com',
    })

    response.assertStatus(422)
    response.assertBody({
      errors: [
        {
          field: 'password',
          message: 'The password field must be defined',
          rule: 'required',
        },
      ],
    })
  })

  test('Should not create a User if e-mail already exists', async ({ client }) => {
    const response = await client.post('/users').json({
      email: 'user_valid@test.com',
      password: '123456',
    })

    response.assertStatus(409)
    response.assertBodyContains({
      message: 'User already exists',
    })
  })
})
