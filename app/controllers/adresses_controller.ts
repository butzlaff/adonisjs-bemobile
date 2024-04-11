import Address from '#models/address'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdressesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return await Address.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const adress = request.only(['street', 'district', 'adressNumber'])
    const newAdress = await Address.create(adress)
    return newAdress
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const adressId = params.id
    const adress = await Address.find(adressId)
    if (adress) return response.send(adress)
    return response.notFound({ message: 'Address not found' })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const adressId = Number(params.id)
    const adress = await Address.find(adressId)
    if (!adress) return response.notFound({ message: 'Address not found' })
    const body = request.only(['street', 'district', 'adressNumber'])
    await adress.merge(body).save()
    return response.send(adress)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const adressId = params.id
    const adress = await Address.find(adressId)
    if (adress) {
      await adress.delete()
      return response.noContent()
    }
    return response.notFound({ message: 'Address not found' })
  }
}
