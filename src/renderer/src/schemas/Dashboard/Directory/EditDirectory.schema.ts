/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* - Base - */
/* Description */ import { DescriptionBaseSchema } from '../../Base/Description.base.schema'
/* Directory */ import { DirectoryBaseSchema } from '../../Base/Directory.base.schema'
/* Icon */ import { IconBaseSchema } from '../../Base/Icon.base.schema'
/* IconColor */ import { IconColorBaseSchema } from '../../Base/IconColor.base.schema'
/* FontColor */ import { FontColorBaseSchema } from '../../Base/FontColor.base.schema'
/* Information */ import { InformationBaseSchema } from '../../Base/Information.base.schema'

/* | - Edit Directory Schema - | */
/* - EditDirectorySchema - */
export const EditDirectorySchema = z.object({
  description: DescriptionBaseSchema,
  name: DirectoryBaseSchema,
  icon: IconBaseSchema,
  iconColor: IconColorBaseSchema,
  fontColor: FontColorBaseSchema,
  information: InformationBaseSchema
})
