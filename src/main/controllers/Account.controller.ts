/* | - Imports - | */
/* - Express - */
import { Request, Response } from 'express'

/* - bcrypt -*/
import { hash } from 'bcrypt'

/* - DB - */
import { AppDataSource } from '../db/db'

/* - DB Entities - */
/* Account */ import { AccountEntity } from '../db/entities/Account.entity'

/* - delete Account Controller - */
export const deleteAccountController = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    /* - Consts - */
    const { id } = req.account

    /* - Already Exist - */
    const account = await AccountEntity.findOne({
      where: { id: parseInt(id) },
      select: { id: true }
    })

    if (account === null) return res.status(409).send({ status: 'error' })

    /* - DB delete - */
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(AccountEntity)
      .where('id = :id', { id: parseInt(id) })
      .execute()

    /* - Return - */
    return res.status(200).send({ status: 'success' })

    /* error */
  } catch (error) {
    console.log(error)
  }
}

/* - put Account Controller - */
export const putAccountController = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    /* - Consts - */
    const { id } = req.account
    const { password } = req.body.data

    /* - Already Exist - */
    const account = await AccountEntity.findOne({
      where: { id: parseInt(id) }
    })

    if (account === null) return res.status(404).send({ status: 'error' })

    /* - DB put - */
    if (password !== null || String(password).length <= 0) {
      const saltOrRounds = 9
      const passwordHash = await hash(password, saltOrRounds)
      account.password = passwordHash
    }

    /* save */
    account.save()

    /* - Return - */
    return res.status(200).send({ status: 'success' })

    /* - Error - */
  } catch (error) {
    console.log(error)
  }
}
