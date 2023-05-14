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
@Entity({
  name: 'links',
})
export default class LinkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => UserEntity, (user) => user.id, {
    eager: true,
  })
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  author: UserEntity;

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
}
