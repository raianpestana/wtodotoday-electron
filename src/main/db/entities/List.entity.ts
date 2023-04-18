/* | - Imports - | */
/* - TypeORM - */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Relation } from 'typeorm'

/* - Entity - */
/* Folder */ import { FolderEntity } from './Folder.entity'

/* | - List Entity - | */
/* - ListEntity - */
@Entity({ name: 'list' })
export class ListEntity extends BaseEntity {
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

  @Column({ default: '#ffffff' })
  iconColor: string

  @Column({ default: '#ffffff' })
  fontColor: string

  @Column({ default: 'Predeterminado' })
  state: string

  @Column({ default: 0 })
  elevation: number

  @Column({ default: 0 })
  ranking: number

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => FolderEntity, (folder) => folder.lists, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  folder: Relation<FolderEntity>
}
