/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* | - Information Base Schema - | */
/* - InformationBaseSchema - */
export const InformationBaseSchema = z.string().trim().nullable()
