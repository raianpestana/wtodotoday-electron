/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* - Base - */
/* Description */ import { DescriptionBaseSchema } from '../../Base/Description.base.schema'
/* Directory */ import { DirectoryBaseSchema } from '../../Base/Directory.base.schema'
/* Icon */ import { IconBaseSchema } from '../../Base/Icon.base.schema'
/* State */ import { StateBaseSchema } from '../../Base/State.base.schema'

/* | - Add List Schema - | */
/* - AddListSchema - */
export const AddListSchema = z.object({
  description: DescriptionBaseSchema,
  name: DirectoryBaseSchema,
  icon: IconBaseSchema,
  state: StateBaseSchema
})
