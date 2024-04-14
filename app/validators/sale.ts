import vine from '@vinejs/vine'

export const createSaleValidator = vine.compile(
  vine.object({
    clientId: vine.number(),
    products: vine.array(
      vine.object({
        productId: vine.number(),
        quantity: vine.number(),
        price: vine.number(),
      })
    ),
  })
)
