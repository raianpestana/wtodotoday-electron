/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* - Base - */
/* Description */ import { DescriptionBaseSchema } from '../../Base/Description.base.schema'
/* Directory */ import { DirectoryBaseSchema } from '../../Base/Directory.base.schema'
/* Icon */ import { IconBaseSchema } from '../../Base/Icon.base.schema'
/* Information */ import { InformationBaseSchema } from '../../Base/Information.base.schema'

/* | - Edit Directory Schema - | */
/* - EditDirectorySchema - */
export const EditDirectorySchema = z.object({
  description: DescriptionBaseSchema,
  name: DirectoryBaseSchema,
  icon: IconBaseSchema,
  information: InformationBaseSchema
})
