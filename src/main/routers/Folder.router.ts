/* | - Imports - | */
/* - Express - */
import { Router } from 'express'

/* - Controllers - */
/* create */ import { createFolderController } from '../controllers/Folder.controller'
/* delete */ import { deleteFolderController } from '../controllers/Folder.controller'
/* edit */ import { editFolderController } from '../controllers/Folder.controller'

/* - Middleware - */
import { tokenValidator } from '../middlewares/tokenValidator.middleware'

/* | - Consts - | */
/* - Router - */
export const addFolderRouter: Router = Router()

/* | - Folder - | */
/* - create Folder - */
addFolderRouter.post('/directory/:idD/folder', tokenValidator, createFolderController)

/* - delete Folder - */
addFolderRouter.delete('/directory/:idD/folder/:idF', tokenValidator, deleteFolderController)

/* - edit Folder - */
addFolderRouter.put('/directory/:idD/folder/:idF', tokenValidator, editFolderController)
