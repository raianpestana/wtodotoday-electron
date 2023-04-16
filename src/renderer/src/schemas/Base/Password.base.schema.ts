/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* | - Password Base Schema - | */
/* - PasswordBaseSchema - */
export const PasswordBaseSchema = z
  .string()
  .min(1, {
    message: 'La contraseña debe tener entre 1 y 30 caracteres.'
  })
  .max(30, {
    message: 'La contraseña debe tener entre 1 y 30 caracteres.'
  })
