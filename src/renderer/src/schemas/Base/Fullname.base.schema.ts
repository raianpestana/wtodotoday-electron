/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* | - Fullname Base Schema - | */
/* - FullnameBaseSchema - */
export const FullnameBaseSchema = z
  .string()
  .trim()
  .min(1, {
    message: 'El nombe completo debe tener entre 1 y 30 caracteres.'
  })
  .max(30, {
    message: 'El nombe completo debe tener entre 1 y 30 caracteres.'
  })
