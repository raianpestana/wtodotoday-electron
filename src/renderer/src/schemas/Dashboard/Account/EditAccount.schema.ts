/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* | - Edit Account Schema - | */
/* - EditAccountSchema - */
export const EditAccountSchema = z.object({
  password: z
    .string()
    .max(30, {
      message: 'La contraseña debe tener entre 1 y 30 caracteres.'
    })
    .nullable()
})
