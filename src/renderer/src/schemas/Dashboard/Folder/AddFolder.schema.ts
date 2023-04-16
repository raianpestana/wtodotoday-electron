/* | - Imports - | */
/* - Zod - */
import * as z from 'zod'

/* - Base - */
/* Folder */ import { FolderBaseSchema } from '../../Base/Folder.base.schema'

/* | - Add Folder Schema - | */
/* - AddFolderSchema - */
export const AddFolderSchema = z.object({
  name: FolderBaseSchema
})
