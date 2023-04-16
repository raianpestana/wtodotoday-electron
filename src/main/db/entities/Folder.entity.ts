/* | - Imports - | */
/* - TypeORM - */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm'
import type { Relation } from 'typeorm'

/* - Entity - */
/* Directory */ import { DirectoryEntity } from './Directory.entity'
/* List */ import { ListEntity } from './List.entity'

/* | - Folder Entity - | */
/* - FolderEntity - */
@Entity({ name: 'folder' })
export class FolderEntity extends BaseEntity {
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

  @ManyToOne(() => DirectoryEntity, (directory) => directory.folders, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  directory: Relation<DirectoryEntity>

  @OneToMany(() => ListEntity, (list) => list.folder)
  lists: Relation<ListEntity[]>
}
