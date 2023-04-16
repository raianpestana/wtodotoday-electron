/* | - Imports - | */
/* - TypeORM - */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Relation } from 'typeorm'

/* - Entity - */
/* Directory */ import { DirectoryEntity } from './Directory.entity'

/* | - Account Entity - | */
/* - AccountEntity - */
@Entity({ name: 'account' })
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  email: string

  @Column()
  fullname: string

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedAt: Date

  @Column({ select: false })
  password: string

  @OneToMany(() => DirectoryEntity, (directory) => directory.account)
  directories: Relation<DirectoryEntity[]>
}
