import { z } from 'zod'

const validEmail = z.string().email()

type Email = z.infer<typeof validEmail>

export class UserService {
  validateEmail(email: Email) {
    const userIsValid = validEmail.safeParse(email)
    if (!userIsValid.success) {
      return false
    }
    return true
  }
}
