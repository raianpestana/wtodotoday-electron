/* | - Imports - | */
/* - Express - */
import { Request, Response } from 'express'

/* - DB - */
import { AppDataSource } from '../db/db'
/* Account */ import { AccountEntity } from '../db/entities/Account.entity'
/* Directory */ import { DirectoryEntity } from '../db/entities/Directory.entity'

/* | - Directory - | */
/* - create Directory Controller - */
export const createDirectoryController = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    /* - Consts - */
    const { id } = req.account
    const { name } = req.body

    /* - Already Exist - */
    const account = await AccountEntity.findOne({
      where: { id: parseInt(id) }
    })

    if (account === null) return res.status(409).send({ status: 'error' })

    /* - DB create - */
    const directory = await AppDataSource.createQueryBuilder()
      .insert()
      .into(DirectoryEntity)
      .values([{ name: name, account: { id: parseInt(id) } }])
      .execute()

    const directories = await DirectoryEntity.findOne({
      where: { id: parseInt(directory.generatedMaps[0].id as string) },
      relations: { folders: true }
    })

    /* - Return - */
    return res.status(200).send({ status: 'success', directories })

    /* - Error - */
  } catch (error) {
    console.log(error)
  }
}

/* - delete Directory Controller - */
export const deleteDirectoryController = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    /* - Consts - */
    const { id } = req.account
    const { idD } = req.params

    /* - Already Exist - */
    const directory = await DirectoryEntity.findOne({
      where: { id: parseInt(idD), account: { id: parseInt(id) } },
      select: { id: true }
    })

    if (directory === null) return res.status(409).send({ status: 'error' })

    /* - DB delete - */
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(DirectoryEntity)
      .where('id = :id', { id: idD })
      .execute()

    /* - Return - */
    return res.status(200).send({ status: 'success' })

    /* - Error - */
  } catch (error) {
    console.log(error)
  }
}

/* - edit Directory Controller - */
export const editDirectoryController = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    /* - Consts - */
    const { id } = req.account
    const { idD } = req.params
    const { name, icon, description, information } = req.body.data

    /* - Already Exist - */
    const directory = await DirectoryEntity.findOne({
      where: { id: parseInt(idD), account: { id: parseInt(id) } }
    })

    if (directory === null) return res.status(409).send({ status: 'error' })

    /* - DB edit - */
    directory.name = name

    if (icon !== null) {
      directory.icon = icon
    }

    if (description !== null) {
      directory.description = description
    }

    if (information !== null) {
      directory.information = information
    }

    directory.save()

    /* - Return - */
    return res.status(200).send({ status: 'success' })

    /* - Error - */
  } catch (error) {
    console.log(error)
  }
}
