import Telephone from '#models/telephone'
import { updateTelephoneValidator } from '#validators/telephone'
import type { HttpContext } from '@adonisjs/core/http'
import { isEmptyObject } from '@sindresorhus/is'

export default class TelephonesController {
  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const clientId = Number(params.id)

    const telephone = await Telephone.findBy('clientId', clientId)

    if (!telephone) return response.notFound({ message: 'Client telephone not found' })

    const body = request.only(['number'])

    const payload = await updateTelephoneValidator.validate(body)

    if (isEmptyObject(payload)) return response.badRequest({ message: 'Invalid data' })

    await telephone.merge(body).save()

    return response.send(telephone)
  }
}
