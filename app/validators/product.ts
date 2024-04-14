import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string(),
    price: vine.number(),
    description: vine.string(),
    image: vine.string(),
  })
)
export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    price: vine.number().optional(),
    description: vine.string().optional(),
    image: vine.string().optional(),
  })
)
