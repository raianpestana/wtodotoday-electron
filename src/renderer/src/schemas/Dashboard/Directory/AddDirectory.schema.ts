/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* - Base - */
/* Directory */ import { DirectoryBaseSchema } from '../../Base/Directory.base.schema'

/* | - Add Directory Schema - | */
/* - AddDirectorySchema - */
export const AddDirectorySchema = z.object({
  name: DirectoryBaseSchema
})
