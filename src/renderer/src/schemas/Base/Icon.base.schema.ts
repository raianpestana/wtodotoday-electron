/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* | - Icon Base Schema - | */
/* - IconBaseSchema - */
export const IconBaseSchema = z.string().trim().min(1)
