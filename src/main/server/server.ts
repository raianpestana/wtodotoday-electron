/* | - Imports - | */
/* - Dependencies - */
import httpServer from '../app/app'
import { AppDataSource } from '../db/db'
import { appConfig } from '../config/app.config'

/* | - initialize server - | */
/* - server - */
export const server = async (): Promise<void> => {
  try {
    await AppDataSource.initialize()
    httpServer.listen(appConfig.SERVER_PORT)
    console.log(`TypeScript with Express
    http://localhost:${appConfig.SERVER_PORT}/ 🚀`)
  } catch (error) {
    console.error(error)
  }
}
