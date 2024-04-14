import Sale from '#models/sale'
import SaleProduct from '#models/sale_product'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

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
    try {
      const { products, clientId } = request.only(['clientId', 'products'])

      const totalPrice: number = products.reduce(
        (total: number, product: SaleProduct) => total + product.quantity * product.price,
        0
      )

      const sale = await db.transaction(async (trx) => {
        const newSale = await Sale.create({ clientId, totalPrice }, { client: trx })

        const saleProductsData = products.map((product: SaleProduct) => ({
          ...product,
          saleId: newSale.id,
        }))
        await SaleProduct.createMany(saleProductsData, { client: trx })

        return newSale
      })

      return await Sale.query().preload('products').where('id', sale.id).firstOrFail()
    } catch (error) {
      console.error(error)
      throw new Error('Error to create a sale')
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    try {
      const sale = await Sale.query().where('id', params.id).preload('products').firstOrFail()
      return response.send(sale)
    } catch (error) {
      return response.notFound({ message: 'Sale not found' })
    }
  }
}
