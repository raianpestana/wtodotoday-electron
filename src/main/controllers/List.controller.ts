/* | - Imports - | */
/* - Express - */
import { Request, Response } from 'express'

/* - DB - */
import { AppDataSource } from '../db/db'
/* Account */ import { AccountEntity } from '../db/entities/Account.entity'
/* List */ import { ListEntity } from '../db/entities/List.entity'

/* | - List - | */
/* - create List Controller - */
export const createListController = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    /* - Consts - */
    const { id } = req.account
    const { idD, idF } = req.params
    const { name, description, icon, state } = req.body.data
    const iconDefault = String(icon)

    /* - Already Exist - */
    const account = await AccountEntity.findOne({
      where: {
        id: parseInt(id),
        directories: { id: parseInt(idD), folders: { id: parseInt(idF) } }
      }
    })

    if (account === null) return res.status(409).send({ status: 'error' })

    /* - DB create - */
    const listCreate = await AppDataSource.createQueryBuilder()
      .insert()
      .into(ListEntity)
      .values([
        {
          name: name,
          description: description,
          icon:
            iconDefault.length <= 0 || iconDefault === null || iconDefault === undefined
              ? 'Default'
              : iconDefault,
          state: state,
          folder: { id: parseInt(idF) }
        }
      ])
      .execute()

    const lists = await ListEntity.findOne({
      where: { id: parseInt(listCreate.generatedMaps[0].id) }
    })

    /* - Return - */
    return res.status(200).send({ status: 'success', lists })

    /* - Error - */
  } catch (error) {
    console.log(error)
  }
}

/* - delete List Controller - */
export const deleteListController = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    /* - Consts - */
    const { id } = req.account
    const { idD, idF, idL } = req.params

    /* - Already Exist - */
    const list = await ListEntity.findOne({
      where: {
        id: parseInt(idL),
        folder: {
          id: parseInt(idF),
          directory: { id: parseInt(idD), account: { id: parseInt(id) } }
        }
      }
    })

    if (list === null) return res.status(409).send({ status: 'error' })

    /* - DB delete - */
    await AppDataSource.createQueryBuilder()
      .delete()
      .from(ListEntity)
      .where('id = :id', { id: parseInt(idL) })
      .execute()

    /* - Return - */
    return res.status(200).send({ status: 'success' })

    /* - Error - */
  } catch (error) {
    console.log(error)
  }
}

/* - edit List Controller - */
export const editListController = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    /* - Consts - */
    const { id } = req.account
    const { idD, idF, idL } = req.params
    const {
      name,
      description,
      information,
      state,
      icon,
      iconColor,
      fontColor,
      elevation,
      ranking
    } = req.body.data

    /* - Already Exist - */
    const list = await ListEntity.findOne({
      where: {
        id: parseInt(idL),
        folder: {
          id: parseInt(idF),
          directory: { id: parseInt(idD), account: { id: parseInt(id) } }
        }
      }
    })

    if (list === null) return res.status(409).send({ status: 'error' })

    /* - DB edit - */
    if (icon !== null) {
      list.icon = icon
    }

    if (iconColor !== null) {
      list.iconColor = iconColor
    }

    if (fontColor !== null) {
      list.fontColor = fontColor
    }

    if (elevation !== null) {
      list.elevation = elevation
    }

    if (description !== null) {
      list.description = description
    }

    if (information !== null) {
      list.information = information
    }

    if (state !== null) {
      list.state = state
    }

    if (ranking !== null) {
      list.ranking = ranking
    }

    list.name = name
    list.save()

    /* - Return - */
    return res.status(200).send({ status: 'success' })

    /* - Error - */
  } catch (error) {
    console.log(error)
  }
}
