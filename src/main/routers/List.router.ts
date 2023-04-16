/* | - Imports - | */
/* - Express - */
import { Router } from 'express'

/* - Controllers - */
/* create */ import { createListController } from '../controllers/List.controller'
/* delete */ import { deleteListController } from '../controllers/List.controller'
/* edit */ import { editListController } from '../controllers/List.controller'

/* - Middleware - */
import { tokenValidator } from '../middlewares/tokenValidator.middleware'

/* | - Consts - | */
/* - Router - */
export const addListRouter: Router = Router()

/* | - List - | */
/* - create List - */
addListRouter.post('/directory/:idD/folder/:idF/list', tokenValidator, createListController)

/* - delete List - */
addListRouter.delete('/directory/:idD/folder/:idF/list/:idL', tokenValidator, deleteListController)

/* - edit List - */
addListRouter.put('/directory/:idD/folder/:idF/list/:idL', tokenValidator, editListController)
