/* | - Imports - | */
/* - TypeORM - */
import { DataSource } from 'typeorm'

/* - Others - */
import { join } from 'path'
import { app } from 'electron'

/* - Entities - */
/* Account */ import { AccountEntity } from './entities/Account.entity'
/* Directory */ import { DirectoryEntity } from './entities/Directory.entity'
/* Folder */ import { FolderEntity } from './entities/Folder.entity'
/* List */ import { ListEntity } from './entities/List.entity'

/* | - Consts - | */
/* - Database - */
const dbPath = join(app.getPath('userData'), 'SQLite', 'wtodotoday.db.sqlite')

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: dbPath,
  entities: [AccountEntity, DirectoryEntity, FolderEntity, ListEntity],
  logging: true,
  synchronize: true
})

// export const AppDataSource = new DataSource({
//   type: 'postgres',
//   host: 'localhost',
//   port: 5432,
//   username: 'postgres',
//   password: '1808',
//   database: 'wtodotodaydb',
//   entities: [AccountEntity, DirectoryEntity, FolderEntity, ListEntity],
//   logging: true,
//   synchronize: true
// })
