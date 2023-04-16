/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* - Base - */
/* Username */ import { UsernameBaseSchema } from '../Base/Username.base.schema'
/* Password */ import { PasswordBaseSchema } from '../Base/Password.base.schema'

/* | - Auth Login Schema - | */
/* - AuthLoginSchema - */
export const AuthLoginSchema = z.object({
  username: UsernameBaseSchema,
  password: PasswordBaseSchema
})
