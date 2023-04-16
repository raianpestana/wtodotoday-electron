/* | - Imports - | */
/* - TypeORM - */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Relation } from 'typeorm'

/* - Entities - */
/* Account */ import { AccountEntity } from './Account.entity'
/* Folder */ import { FolderEntity } from './Folder.entity'

/* | - Directory Entity - | */
/* - DirectoryEntity - */
@Entity({ name: 'directory' })
export class DirectoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @Column({ nullable: true })
  information: string

  @Column({ default: 'Predeterminado' })
  icon: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => AccountEntity, (account) => account.directories, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  account: Relation<AccountEntity>

  @OneToMany(() => FolderEntity, (folder) => folder.directory)
  folders: Relation<FolderEntity[]>
}
