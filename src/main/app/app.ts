/* | - Imports - | */
/* - Dependencies - */
import cors from 'cors'
import morgan from 'morgan'
import express, { Express } from 'express'
import { createServer, Server } from 'http'

/* - Routers - */
/* Account */ import { addAccountRouter } from '../routers/Account.router'
/* Auth */ import { addAuthRouter } from '../routers/Auth.router'
/* Directory */ import { addDirectoryRouter } from '../routers/Directory.router'
/* Folder */ import { addFolderRouter } from '../routers/Folder.router'
/* List */ import { addListRouter } from '../routers/List.router'

/* | - Consts - | */
/* - Server - */
export const app: Express = express()
const httpServer: Server = createServer(app)

/* | - Middlewares - | */
/* - Cors - */
app.use(
  cors({
    origin: '*',
    credentials: true
  })
)

app.use(morgan('dev'))
app.use(express.json())

/* | - Routers - | */
/* - Path - */
const pathRouter = '/api'

/* - Add routers - */
/* Account */ app.use(pathRouter, addAccountRouter)
/* Auth */ app.use(pathRouter, addAuthRouter)
/* Directory */ app.use(pathRouter, addDirectoryRouter)
/* Folder */ app.use(pathRouter, addFolderRouter)
/* List */ app.use(pathRouter, addListRouter)

/* Export */
export default httpServer
