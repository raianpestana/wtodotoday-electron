/* | - Imports - | */
/* - Express - */
import { Router } from 'express'

/* - Controllers - */
/* create */ import { createDirectoryController } from '../controllers/Directory.controller'
/* delete */ import { deleteDirectoryController } from '../controllers/Directory.controller'
/* edit */ import { editDirectoryController } from '../controllers/Directory.controller'

/* - Middleware - */
import { tokenValidator } from '../middlewares/tokenValidator.middleware'

/* | - Consts - | */
/* - Router - */
export const addDirectoryRouter: Router = Router()

/* | - Directory - | */
/* - create Directory - */
addDirectoryRouter.post('/directory', tokenValidator, createDirectoryController)

/* - delete Directory - */
addDirectoryRouter.delete('/directory/:idD', tokenValidator, deleteDirectoryController)

/* - edit Directory - */
addDirectoryRouter.put('/directory/:idD', tokenValidator, editDirectoryController)
