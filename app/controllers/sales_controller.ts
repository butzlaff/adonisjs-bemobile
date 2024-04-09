import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return 'ok'
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    return { request }
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return { params }
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
  async destroy({ params }: HttpContext) {
    return { params }
  }
}
