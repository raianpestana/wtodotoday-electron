/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* | - Ranking Base Schema - | */
/* - RankingBaseSchema - */
const isString = (value: unknown): value is string => typeof value === 'string'

export const RankingBaseSchema = z.preprocess(
  (value) => (isString(value) ? parseFloat(value) : value),
  z.number().nonnegative().max(5)
)
