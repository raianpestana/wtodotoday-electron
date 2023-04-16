/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* - Base - */
/* Fullname */ import { FullnameBaseSchema } from '../Base/Fullname.base.schema'
/* Username */ import { UsernameBaseSchema } from '../Base/Username.base.schema'
/* Password */ import { PasswordBaseSchema } from '../Base/Password.base.schema'
/* Email */ import { EmailBaseSchema } from '../Base/Email.base.schema'

/* | - Auth Register Schema - | */
/* - AuthRegisterSchema - */
export const AuthRegisterSchema = z.object({
  fullname: FullnameBaseSchema,
  username: UsernameBaseSchema,
  password: PasswordBaseSchema,
  email: EmailBaseSchema
})
