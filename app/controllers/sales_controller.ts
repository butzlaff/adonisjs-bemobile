import Sale from '#models/sale'
import SaleProduct from '#models/sale_product'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const sales = await Sale.query().preload('products')
    return sales
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const { products, clientId } = request.only(['clientId', 'products'])
    const totalPrice: number = products.reduce(
      (total: number, product: SaleProduct) => total + product.quantity * product.price,
      0
    )
    const data = { clientId, totalPrice }
    const sale = await Sale.create(data)
    await SaleProduct.createMany(
      products.map((product: SaleProduct) => ({ ...product, saleId: sale.id }))
    )
    return await Sale.findBy('id', sale.id)
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const sale = await Sale.query().where('id', params.id).preload('products').firstOrFail()
    return sale
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
