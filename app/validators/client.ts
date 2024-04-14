import vine from '@vinejs/vine'

export const createClientValidator = vine.compile(
  vine.object({
    name: vine.string(),
    cpf: vine.string().fixedLength(11),
    email: vine.string().email(),
    address: vine.object({
      street: vine.string(),
      district: vine.string(),
      addressNumber: vine.number(),
    }),
    telephone: vine.object({
      number: vine.string(),
    }),
  })
)

export const updateClientValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    cpf: vine.string().fixedLength(11).optional(),
    email: vine.string().email().optional(),
  })
)
