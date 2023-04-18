/* | - Imports - | */
/* - Express - */
import { Request, Response } from 'express'

/* - bcrypt -*/
import { hash, compare } from 'bcrypt'

/* - DB - */
import { AppDataSource } from '../db/db'

/* - DB Entities - */
/* Account */ import { AccountEntity } from '../db/entities/Account.entity'
import { DirectoryEntity } from '../db/entities/Directory.entity'
import { FolderEntity } from '../db/entities/Folder.entity'
import { ListEntity } from '../db/entities/List.entity'

/* - Utils - */
import { tokenGenerator } from '../utils/tokenManager'

/* | - Account - | */
/* - create Account Controller - */
export const handleAuthRegisterController = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    /* - Consts - */
    /* req.body */
    const { fullname, username, password, email } = req.body.data

    /* - Already Exist - */
    const usernameAlreadyExist = await AccountEntity.findOne({
      where: { username: username }
    })

    const emailAlreadyExist = await AccountEntity.findOne({
      where: { email: email }
    })

    if (usernameAlreadyExist)
      return res.status(409).send({ message: 'El nombre de usuario ingresado ya existe' })

    if (emailAlreadyExist) return res.status(409).send({ message: 'El correo ingresado ya existe' })

    /* - Before create - */
    /* - Hash password - */
    const saltOrRounds = 9
    const passwordHash = await hash(password, saltOrRounds)

    /* - DB create - */
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(AccountEntity)
      .values([
        {
          fullname: fullname,
          username: username,
          password: passwordHash,
          email: email
        }
      ])
      .execute()

    /* - Already Exist - */
    const account = await AccountEntity.findOne({
      where: { username: username },
      select: { id: true, password: true }
    })

    if (account !== null) {
      /* - Create token - */
      const { token, expiresIn } = tokenGenerator(account.id)

      /* - Return - */
      return res.json({
        status: 'success',
        token: token,
        expiresIn
      })
    }

    /* - Error - */
  } catch (error) {
    console.log(error)
  }
}

/* - handle Auth Login Controller - */
export const handleAuthLoginController = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    /* - Consts - */
    /* req.body */
    const { username, password } = req.body

    /* - Already Exist - */
    const account = await AccountEntity.findOne({
      where: { username: username },
      select: { id: true, password: true }
    })

    const passwordCorrect = account === null ? false : await compare(password, account.password)

    if (!passwordCorrect || account === null)
      return res.status(409).send({ message: 'Usuario o contraseña incorrectos' })

    /* - Create token - */
    const { token, expiresIn } = tokenGenerator(account.id)

    /* - Return - */
    return res.json({
      status: 'success',
      token: token,
      expiresIn
    })

    /* - Error - */
  } catch (error) {
    console.log(error)
  }
}

/* - handle Auth Profile Controller - */
export const handleAuthProfileController = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    /* - Consts - */
    const { id } = req.account

    /* - Already Exist - */
    const accountExist = await AccountEntity.findOne({
      where: { id: parseInt(id) },
      select: { id: true }
    })

    if (accountExist === null) return res.status(404).send({ status: 'error' })

    /* - Get account - */
    const account = await AccountEntity.findOne({
      where: { id: parseInt(id) },
      relations: ['directories', 'directories.folders', 'directories.folders.lists'],
      order: { directories: { id: 'ASC', folders: { id: 'ASC' } } }
    })

    const statsDirectory = await DirectoryEntity.find({
      where: { account: { id: parseInt(id) } },
      select: { id: true }
    })

    const statsFolders = await FolderEntity.find({
      where: { directory: { account: { id: parseInt(id) } } },
      select: { id: true }
    })

    const statsLists = await ListEntity.find({
      where: { folder: { directory: { account: { id: parseInt(id) } } } },
      select: { id: true }
    })

    const stats = {
      directories: statsDirectory.length,
      folders: statsFolders.length,
      lists: statsLists.length
    }

    /* - Return - */
    return res.json({ status: 'success', account, stats })

    /* error */
  } catch (error) {
    console.log(error)
  }
}
