import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Product from './product.js'
import Sale from './sale.js'

export default class SaleProduct extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare quantity: number

  @column()
  declare price: number

  @hasOne(() => Sale)
  @column()
  declare saleId: HasOne<typeof Sale>

  @hasOne(() => Product)
  @column()
  declare productId: HasOne<typeof Product>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
