import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)

export const updateUserValidator = vine.compile(
  vine.object({
    email: vine.string().email().optional(),
    password: vine.string().optional(),
  })
)
