import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import UserEntity from './user.entity';
import { LinkMethodType } from '../links/links.type';
import GroupEntity from './group.entity';
@Entity({
  name: 'links',
})
export default class LinkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    name: 'user_id',
  })
  user: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    eager: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  userEntity: UserEntity;

  @Column({
    name: 'group_id',
    nullable: true,
  })
  public group: number;

  @ManyToOne(() => GroupEntity, (group) => group.id, {
    eager: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'group_id',
    referencedColumnName: 'id',
  })
  groupEntity: GroupEntity;

  @Column({
    name: 'name',
    nullable: false,
  })
  public name: string;

  @Column({
    name: 'redirect',
    nullable: false,
  })
  public redirect: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'last_update',
  })
  public lastUpdate: string;

  @Column({
    name: 'enabled',
    default: true,
    nullable: false,
  })
  public enabled: boolean;

  @Column({
    type: 'enum',
    enum: ['normal', 'subdomain'],
    default: 'normal',
  })
  method: LinkMethodType;
}
