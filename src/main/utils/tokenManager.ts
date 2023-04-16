/* | - Imports - | */
/* - jwt - */
import jwt from 'jsonwebtoken'

/* config - */
import { appConfig } from '../config/app.config'

/* - Types - */
type TokenGeneratorType = {
  token: string
  expiresIn: string | number
}
/* | - token - | */
/* - tokenGenerator - */
export const tokenGenerator = (id: number): TokenGeneratorType => {
  const expiresIn = '7d'

  const token = jwt.sign({ id }, appConfig.JWT_SECRET, { expiresIn })
  return { token, expiresIn }
}
