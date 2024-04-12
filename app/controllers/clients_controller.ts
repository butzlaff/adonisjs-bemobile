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
    const { address, ...client } = request.only(['name', 'cpf', 'address'])
    const newClient = await Client.create(client)
    if (address) newClient.related('address').create(address)
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
      .firstOrFail()

    return client
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const clientId = Number(params.id)

    const client = await Client.find(clientId)

    if (!client) return response.notFound({ message: 'Client not found' })

    const data = request.only(['name', 'cpf', 'address'])

    const cpfAlreadyUsed = await Client.findBy('cpf', data.cpf)

    if (cpfAlreadyUsed && cpfAlreadyUsed.id !== client.id) {
      return response.badRequest({ message: 'Cpf already in used' })
    }

    await client.merge(data).save()

    return response.send(client)
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    return { params }
  }
}
