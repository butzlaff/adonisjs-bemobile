import vine from '@vinejs/vine'

export const updateAddressValidator = vine.compile(
  vine.object({
    street: vine.string().optional(),
    district: vine.string().optional(),
    addressNumber: vine.number().optional(),
  })
)
