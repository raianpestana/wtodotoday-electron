/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* | - Description Base Schema - | */
/* - DescriptionBaseSchema - */
export const DescriptionBaseSchema = z
  .string()
  .trim()
  .max(30, {
    message: 'La descripción sólo admite un máximo de 30 caracteres.'
  })
  .nullable()
