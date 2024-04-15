import Address from '#models/address'
import { updateAddressValidator } from '#validators/address'
import type { HttpContext } from '@adonisjs/core/http'
import { isEmptyObject } from '@sindresorhus/is'

export default class AddressesController {
  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const clientId = Number(params.id)

    const adress = await Address.findBy('clientId', clientId)

    if (!adress) return response.notFound({ message: 'Client address not found' })

    const body = request.only(['street', 'district', 'adressNumber'])

    const payload = await updateAddressValidator.validate(body)

    if (isEmptyObject(payload)) return response.badRequest({ message: 'Invalid data' })

    await adress.merge(payload).save()

    return response.send(adress)
  }
}
