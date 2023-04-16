/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* | - Folder Base Schema - | */
/* - FolderBaseSchema - */
export const FolderBaseSchema = z
  .string()
  .trim()
  .min(1, {
    message: 'El nombe de la carpeta debe tener entre 1 y 11 caracteres.'
  })
  .max(11, {
    message: 'El nombe de la carpeta debe tener entre 1 y 11 caracteres.'
  })
