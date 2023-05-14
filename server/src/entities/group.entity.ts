import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import UserEntity from './user.entity';

@Entity({
  name: 'groups',
})
export default class GroupEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
  })
  public id: number;

  @Column({
    name: 'name',
    nullable: false,
    unique: true,
  })
  public name: string;

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

  @CreateDateColumn({
    name: 'created_at',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'last_update',
  })
  public lastUpdate: string;

  @Column({
    name: 'color',
  })
  public color: string;
}
