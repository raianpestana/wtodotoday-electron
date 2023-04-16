/* | - Imports - | */
/* - Express - */
import { Request, Response, NextFunction } from 'express'

/* - jwt - */
import jwt from 'jsonwebtoken'

/* - config - */
import { appConfig } from '../config/app.config'

/* | - token Validator - | */
/* - tokenValidator - */
export const tokenValidator = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: 'No autorizado' })

  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'No autorizado' })

  jwt.verify(token, appConfig.JWT_SECRET, (err, account): void | Response => {
    if (err) return res.status(403).json([{ message: 'No autorizado' }])
    req.account = account as { id: string }
    next()
  })
}
