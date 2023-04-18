/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* | - Email Base Schema - | */
/* - EmailBaseSchema - */
export const EmailBaseSchema = z.string().email({ message: 'Debe escribir un correo válido.' })
