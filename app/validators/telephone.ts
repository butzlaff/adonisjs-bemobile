import vine from '@vinejs/vine'

export const updateTelephoneValidator = vine.compile(
  vine.object({
    number: vine.number().optional(),
  })
)
