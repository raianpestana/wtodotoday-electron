/* | - Imports - | */
/* - Express - */
import Router from 'express-promise-router'

/* - Controllers - */
/* Register */ import { handleAuthRegisterController } from '../controllers/Auth.controller'
/* Login */ import { handleAuthLoginController } from '../controllers/Auth.controller'
/* Profile */ import { handleAuthProfileController } from '../controllers/Auth.controller'

/* - Middleware - */
import { tokenValidator } from '../middlewares/tokenValidator.middleware'

/* | - Consts - | */
/* - Router - */
export const addAuthRouter = Router()

/* | - Auth - | */
/* - Register - */
addAuthRouter.post('/auth/register', handleAuthRegisterController)

/* - Login - */
addAuthRouter.post('/auth/login', handleAuthLoginController)

/* - get Profile - */
addAuthRouter.get('/auth/profile', tokenValidator, handleAuthProfileController)
