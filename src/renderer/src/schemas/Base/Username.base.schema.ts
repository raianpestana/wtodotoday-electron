/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* | - Username Base Schema - | */
/* - UsernameBaseSchema - */
export const UsernameBaseSchema = z
  .string()
  .trim()
  .min(1, {
    message: 'El nombe de usuario debe tener entre 1 y 15 caracteres.'
  })
  .max(15, {
    message: 'El nombe de usuario debe tener entre 1 y 15 caracteres.'
  })
