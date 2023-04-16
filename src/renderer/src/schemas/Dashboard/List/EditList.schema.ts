/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* - Base - */
/* Description */ import { DescriptionBaseSchema } from '../../Base/Description.base.schema'
/* List */ import { ListBaseSchema } from '../../Base/List.base.schema'
/* Icon */ import { IconBaseSchema } from '../../Base/Icon.base.schema'
/* Information */ import { InformationBaseSchema } from '../../Base/Information.base.schema'
/* State */ import { StateBaseSchema } from '../../Base/State.base.schema'

/* | - Edit List Schema - | */
/* - EditListSchema - */
export const EditListSchema = z.object({
  description: DescriptionBaseSchema,
  name: ListBaseSchema,
  icon: IconBaseSchema,
  information: InformationBaseSchema,
  state: StateBaseSchema
})
