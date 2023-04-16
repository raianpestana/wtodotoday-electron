/* | - Imports - | */
/* - Express - */
import { NextFunction, Request, Response } from 'express'

/* - zod - */
import { AnyZodObject, ZodError } from 'zod'

/* | - schema Validator - | */
export const schemaValidator =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction): void | Response => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      })

      return next()

      /* - Error - */
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json(
          error.issues.map((issue) => ({
            path: issue.path,
            message: issue.message
          }))
        )
      }
      return res.status(400).json({ message: 'Internal server error' })
    }
  }
