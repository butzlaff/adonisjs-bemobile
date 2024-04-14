import Client from '#models/client'
import { createClientValidator } from '#validators/client'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

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
    // try {
    const body = request.only(['name', 'cpf', 'address', 'telephone'])
    const payload = await createClientValidator.validate(body)
    console.log(payload)
    const newClient = await db.transaction(async (trx) => {
      const { address, telephone, ...data } = payload
      const client = new Client()
      client.useTransaction(trx)
      client.cpf = data.cpf
      client.name = data.name
      await client.save()

      if (address) {
        await client.related('address').create(address)
      }
      if (telephone) await client.related('telephone').create(telephone)
      return client
    })

    return response.created(newClient)
    // } catch (error) {
    //   return response.status(500).send({ message: 'Erro ao criar cliente' })
    // }
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
  async destroy({ params, response }: HttpContext) {
    const clientId = Number(params.id)

    const client = await Client.find(clientId)

    if (!client) return response.notFound({ message: 'Client not found' })

    await client.delete()
  }
}
