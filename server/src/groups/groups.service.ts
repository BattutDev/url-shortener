import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import GroupEntity from '../entities/group.entity';
import { PatchBodyType, PostBodyType } from './groups.type';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  getAllByUserId(uid: number): Promise<Array<GroupEntity>> {
    return this.groupRepository.find({
      where: {
        user: uid,
      },
    });
  }

  async get(uid: number, gid: number): Promise<GroupEntity> {
    const group = await this.groupRepository.findOne({
      where: {
        user: uid,
        id: gid,
      },
    });

    if (!group) throw new NotFoundException('Cannot found this group');

    return group;
  }

  async insert(
    uid: number,
    { name, color }: PostBodyType,
  ): Promise<GroupEntity> {
    if (!name || !color)
      throw new NotAcceptableException('Missing name or color field');

    const isExists = await this.groupRepository.exist({
      where: {
        user: uid,
        name,
      },
    });

    if (isExists)
      throw new HttpException(
        'This name is already taken',
        HttpStatus.NOT_MODIFIED,
      );

    const group = this.groupRepository.create({
      name,
      color,
      user: uid,
    });
    return await this.groupRepository.save(group);
  }

  async update(
    uid: number,
    gid: number,
    { color }: PatchBodyType,
  ): Promise<GroupEntity> {
    if (!color) throw new NotAcceptableException('Missing color field');
    const group = await this.groupRepository.findOne({
      where: {
        user: uid,
        id: gid,
      },
    });

    if (color === group.color)
      throw new HttpException(
        'new color is the same that old color',
        HttpStatus.NOT_MODIFIED,
      );

    if (!group) throw new NotFoundException('Cannot found this group');

    group.color = color;

    return await this.groupRepository.save(group);
  }

  async delete(uid: number, gid: number): Promise<void> {
    return this.groupRepository
      .delete({
        user: uid,
        id: gid,
      })
      .then(null);
  }
}
