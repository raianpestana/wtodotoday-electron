/* | - Imports - | */
/* - Express - */
import { Request, Response } from 'express'

/* - DB - */
import { AppDataSource } from '../db/db'
/* Account */ import { AccountEntity } from '../db/entities/Account.entity'
/* Folder */ import { FolderEntity } from '../db/entities/Folder.entity'

/* | - Folder - | */
/* - create Folder Controller - */
export const createFolderController = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    /* - Consts - */
    const { id } = req.account
    const { idD } = req.params
    const { name } = req.body

    /* - Already Exist - */
    const account = await AccountEntity.findOne({
      where: { id: parseInt(id), directories: { id: parseInt(idD) } }
    })

    if (account === null) return res.status(409).send({ status: 'error' })

    /* - DB create - */
    const folder = await AppDataSource.createQueryBuilder()
      .insert()
      .into(FolderEntity)
      .values([{ name: name, directory: { id: parseInt(idD) } }])
      .execute()

    const folders = await FolderEntity.findOne({
      where: { id: parseInt(folder.generatedMaps[0].id) },
      relations: { lists: true }
    })

    /* - Return - */
    return res.status(200).send({ status: 'success', folders })

    /* - Error - */
  } catch (error) {
    console.log(error)
  }
}

/* - delete Folder Controller - */
export const deleteFolderController = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    /* - Consts - */
    const { id } = req.account
    const { idD, idF } = req.params

    /* - Already Exist - */
    const folder = await FolderEntity.findOne({
      where: {
        id: parseInt(idF),
        directory: { id: parseInt(idD), account: { id: parseInt(id) } }
      }
    })

    if (folder === null) return res.status(409).send({ status: 'error' })

    /* - DB delete - */
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(FolderEntity)
      .where('id = :id', { id: idF })
      .execute()

    /* - Return - */
    return res.status(200).send({ status: 'success' })

    /* - Error - */
  } catch (error) {
    console.log(error)
  }
}

/* - edit Folder Controller - */
export const editFolderController = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    /* - Consts - */
    const { id } = req.account
    const { idD, idF } = req.params
    const { name, icon, iconColor, fontColor, description, information } = req.body.data

    /* - Already Exist - */
    const folder = await FolderEntity.findOne({
      where: {
        id: parseInt(idF),
        directory: { id: parseInt(idD), account: { id: parseInt(id) } }
      }
    })

    if (folder === null) return res.status(409).send({ status: 'error' })

    /* - DB edit - */
    folder.name = name

    if (icon !== null) {
      folder.icon = icon
    }

    if (iconColor !== null) {
      folder.iconColor = iconColor
    }

    if (fontColor !== null) {
      folder.fontColor = fontColor
    }

    if (description !== null) {
      folder.description = description
    }

    if (information !== null) {
      folder.information = information
    }

    folder.save()

    /* - Return - */
    return res.status(200).send({ status: 'success' })

    /* - Error - */
  } catch (error) {
    console.log(error)
  }
}
