import User from '#models/user'
import { UserService } from '#services/user_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  private userService = new UserService()
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return await User.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const userDataValidate = this.userService.validateEmail(email)
    if (userDataValidate === false) {
      return response.badRequest({ message: 'E-mail is not a valid e-mail' })
    }

    const userAlreadExist = await User.findBy('email', email)
    if (userAlreadExist) {
      return response.conflict({ message: 'User already exists' })
    }
    const user = await User.create({
      email,
      password,
    })
    return response.created(user)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const userId = params.id
    const user = await User.find(userId)
    if (user) return response.send(user)
    return response.notFound({ message: 'User not found' })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const userId = Number(params.id)
    const user = await User.find(userId)
    if (!user) return response.notFound({ message: 'User not found' })

    const body = request.only(['email', 'password'])

    const userDataValidate = this.userService.validateEmail(body.email)
    if (userDataValidate === false) {
      return response.badRequest({ message: 'E-mail is not a valid e-mail' })
    }

    const userAlreadExist = await User.findBy('email', body.email)

    if (userAlreadExist && userAlreadExist.id !== userId) {
      return response.conflict({ message: 'User already exists' })
    }

    await user?.merge(body).save()

    return response.send(user)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const userId = params.id
    const user = await User.find(userId)
    if (user) {
      await user.delete()
      return response.noContent()
    }
    return response.notFound({ message: 'User not found' })
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
