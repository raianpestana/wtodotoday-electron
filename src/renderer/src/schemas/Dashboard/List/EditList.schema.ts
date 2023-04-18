/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* - Base - */
/* Description */ import { DescriptionBaseSchema } from '../../Base/Description.base.schema'
/* List */ import { ListBaseSchema } from '../../Base/List.base.schema'
/* Icon */ import { IconBaseSchema } from '../../Base/Icon.base.schema'
/* IconColor */ import { IconColorBaseSchema } from '../../Base/IconColor.base.schema'
/* FontColor */ import { FontColorBaseSchema } from '../../Base/FontColor.base.schema'
/* Information */ import { InformationBaseSchema } from '../../Base/Information.base.schema'
/* State */ import { StateBaseSchema } from '../../Base/State.base.schema'
/* Ranking */ import { RankingBaseSchema } from '../../Base/Ranking.base.schema'
/* Elevation */ import { ElevationBaseSchema } from '../../Base/Elevation.base.schema'

/* | - Edit List Schema - | */
/* - EditListSchema - */
export const EditListSchema = z.object({
  description: DescriptionBaseSchema,
  name: ListBaseSchema,
  icon: IconBaseSchema,
  iconColor: IconColorBaseSchema,
  fontColor: FontColorBaseSchema,
  information: InformationBaseSchema,
  state: StateBaseSchema,
  elevation: ElevationBaseSchema,
  ranking: RankingBaseSchema
})
