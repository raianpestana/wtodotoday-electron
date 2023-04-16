/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* - Base - */
/* Description */ import { DescriptionBaseSchema } from '../../Base/Description.base.schema'
/* Folder */ import { FolderBaseSchema } from '../../Base/Folder.base.schema'
/* Icon */ import { IconBaseSchema } from '../../Base/Icon.base.schema'
/* Information */ import { InformationBaseSchema } from '../../Base/Information.base.schema'

/* | - Edit Folder Schema - | */
/* - EditFolderSchema - */
export const EditFolderSchema = z.object({
  description: DescriptionBaseSchema,
  name: FolderBaseSchema,
  icon: IconBaseSchema,
  information: InformationBaseSchema
})
