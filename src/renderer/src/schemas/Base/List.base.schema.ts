/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* | - List Base Schema - | */
/* - ListBaseSchema - */
export const ListBaseSchema = z
  .string()
  .trim()
  .min(1, {
    message: 'El nombe de la lista debe tener entre 1 y 11 caracteres.'
  })
  .max(11, {
    message: 'El nombe de la lista debe tener entre 1 y 11 caracteres.'
  })
