/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* | - State Base Schema - | */
/* - StateBaseSchema - */
export const StateBaseSchema = z.string().trim().min(1, {
  message: 'Seleccione un estado.'
})
