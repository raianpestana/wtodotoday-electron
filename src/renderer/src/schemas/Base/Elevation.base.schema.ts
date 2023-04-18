/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* | - Elevation Base Schema - | */
/* - ElevationBaseSchema - */
const isString = (value: unknown): value is string => typeof value === 'string'

export const ElevationBaseSchema = z.preprocess(
  (value) => (isString(value) ? parseFloat(value) : value),
  z.number().nonnegative().max(16)
)
