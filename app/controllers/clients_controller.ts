import Client from '#models/client'
import type { HttpContext } from '@adonisjs/core/http'

export default class ClientsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const clients = Client.query().preload('address').orderBy('id', 'asc')
    return clients
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const client = request.only(['name', 'cpf', 'addressId'])
    const newClient = await Client.create(client)
    return response.created(newClient)
  }

  /**
   * Show individual record
   */
  async show({ params, request }: HttpContext) {
    const { year, month } = request.qs()

    const client = await Client.query()
      .where('id', params.id)
      .preload('address')
      .preload('sale', (q) => {
        q.select('*')
        if (month && year) {
          q.whereRaw('YEAR(created_at) = ?', [year])
          q.whereRaw('MONTH(created_at) = ?', [month])
        }
        q.orderBy('createdAt', 'desc')
        q.preload('products')
      })
      .orderBy('id', 'asc')
      .firstOrFail() // assuming you want to return a single client, hence firstOrFail()

    return client
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
