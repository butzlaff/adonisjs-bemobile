import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Client from './client.js'
import SaleProduct from './sale_product.js'

export default class Sale extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @hasOne(() => Client)
  @column()
  declare client: HasOne<typeof Client>

  @hasMany(() => SaleProduct)
  @column()
  declare products: HasMany<typeof SaleProduct>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime
}
