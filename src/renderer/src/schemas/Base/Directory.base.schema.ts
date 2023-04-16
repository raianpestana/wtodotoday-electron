/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* | - Directory Base Schema - | */
/* - DirectoryBaseSchema - */
export const DirectoryBaseSchema = z
  .string()
  .trim()
  .min(1, {
    message: 'El nombe del directorio debe tener entre 1 y 11 caracteres.'
  })
  .max(11, {
    message: 'El nombe del directorio debe tener entre 1 y 11 caracteres.'
  })
