import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sale_products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('quantity').unsigned()
      table.decimal('price').unsigned()
      table.integer('sale_id').unsigned().references('id').inTable('sales').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('id').inTable('products')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
