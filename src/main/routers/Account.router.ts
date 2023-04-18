/* | - Imports - | */
/* - Express - */
import Router from 'express-promise-router'

/* delete */ import { deleteAccountController } from '../controllers/Account.controller'
/* put */ import { putAccountController } from '../controllers/Account.controller'

/* - Middleware - */
import { tokenValidator } from '../middlewares/tokenValidator.middleware'

/* | - Consts - | */
/* - Router - */
export const addAccountRouter = Router()

/* | - Account - | */
/* - delete Profile - */
addAccountRouter.delete('/account/profile', tokenValidator, deleteAccountController)

/* - put Profile - */
addAccountRouter.put('/account/profile', tokenValidator, putAccountController)
