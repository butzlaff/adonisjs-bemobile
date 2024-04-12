import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    const products = await Product.query().orderBy('name', 'asc')
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
  async show({ params, response }: HttpContext) {
    const productId = params.id

    const product = await Product.find(productId)
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
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const productId = Number(params.id)

    const product = await Product.find(productId)
    if (!product) return response.notFound({ message: 'Product not found' })

    await product.delete()
    return response.noContent()
  }
}
