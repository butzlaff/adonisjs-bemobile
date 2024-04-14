import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Address from './address.js'
import Sale from './sale.js'
import Telephone from './telephone.js'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare cpf: string

  @column()
  declare email: string

  @hasOne(() => Address, { foreignKey: 'clientId' })
  declare address: HasOne<typeof Address>

  @hasOne(() => Telephone, { foreignKey: 'clientId' })
  declare telephone: HasOne<typeof Telephone>

  @column.dateTime({ autoCreate: true, serializeAs: null })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  declare updatedAt: DateTime

  @hasMany(() => Sale, { foreignKey: 'clientId' })
  declare sale: HasMany<typeof Sale>
}
