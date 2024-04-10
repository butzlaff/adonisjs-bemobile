import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return await User.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = User.create({
      email,
      password,
    })
    return user
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const user = User.findOrFail(params.id)
    return user
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    return { params, request }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    if (user) {
      await user.delete()
      return response.noContent()
    }
    return response.abort('User not found', 404)
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.findBy('email', email)
    if (user) {
      await User.verifyCredentials(email, password)

      const token = auth.use('jwt').generate(user)

      return token
    }
    return response.send({ error: 'Invalid credentials' })
  }
}
