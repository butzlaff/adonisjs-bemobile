import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const products = await Product.all()
    return products
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const product = request.only(['name', 'price', 'description', 'image', 'stock'])
    const newProduct = await Product.create(product)
    return response.created(newProduct)
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
