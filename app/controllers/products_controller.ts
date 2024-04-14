import Product from '#models/product'
import { createProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const products = await Product.query()
      .whereNull('deleted_at')
      .orderBy([
        { column: 'name', order: 'asc' },
        { column: 'id', order: 'asc' },
      ])
    return products
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const body = request.only(['name', 'price', 'description', 'image'])

    const payload = await createProductValidator.validate(body)

    const newProduct = await Product.create(payload)
    return response.created(newProduct)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const productId = Number(params.id)

    const product = await Product.query().whereNull('deleted_at').where('id', productId).first()
    if (product) return product
    return response.notFound({ message: 'Product not found' })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const productId = Number(params.id)

    const product = await Product.find(productId)
    if (!product) return response.notFound({ message: 'User not found' })

    const body = request.only(['name', 'price', 'description', 'image', 'stock'])

    await product?.merge(body).save()

    return response.send(product)
  }

  /**
   * Soft Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const productId = Number(params.id)

    const product = await Product.find(productId)
    if (!product) return response.notFound({ message: 'Product not found' })

    await product.delete()
    return response.noContent()
  }
}
