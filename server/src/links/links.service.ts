import {
  HttpException,
  HttpStatus,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import LinkEntity from '../entities/link.entity';
import { PatchLinkBodyType, PostLinkBodyType } from './links.type';

@Injectable()
export class LinksService {
  constructor(
    @InjectRepository(LinkEntity)
    private readonly linkRepository: Repository<LinkEntity>,
  ) {}

  getByName(name: string, method): Promise<LinkEntity> {
    return this.linkRepository.findOne({
      where: {
        name,
        method,
      },
    });
  }

  getAll(uid: number): Promise<Array<LinkEntity>> {
    return this.linkRepository.find({
      where: {
        user: uid,
      },
    });
  }

  async get(uid: number, gid: number): Promise<LinkEntity> {
    const link = await this.linkRepository.findOne({
      where: {
        user: uid,
        id: gid,
      },
    });

    if (!link) throw new NotFoundException('Cannot found this link');

    return link;
  }

  async insert(uid: number, body: PostLinkBodyType): Promise<LinkEntity> {
    if (!body.name || !body.redirect)
      throw new NotAcceptableException('Missing name or redirect fields');

    if (body.method && !['normal', 'subdomain'].includes(body.method))
      throw new NotAcceptableException(
        'Method field must be "normal" or "subdomain"',
      );

    const isExists = await this.linkRepository.exist({
      where: {
        name: body.name,
      },
    });

    if (isExists)
      throw new HttpException(
        'This name is already taken',
        HttpStatus.NOT_MODIFIED,
      );

    const link = this.linkRepository.create({ ...body, user: uid });
    return await this.linkRepository.save(link);
  }

  async update(
    uid: number,
    gid: number,
    body: PatchLinkBodyType,
  ): Promise<LinkEntity> {
    if (!body.name && !body.redirect && !body.method)
      throw new NotAcceptableException('Missing fields');

    if (body.method && !['normal', 'subdomain'].includes(body.method))
      throw new NotAcceptableException(
        'Method field must be "normal" or "subdomain"',
      );

    const link = await this.linkRepository.findOne({
      where: {
        user: uid,
        id: gid,
      },
    });

    if (!link) throw new NotFoundException('Cannot found this link');

    for (const [key, value] of Object.entries(body)) {
      if (value) {
        if (link[key] === value)
          throw new HttpException('Same value', HttpStatus.NOT_MODIFIED);
        link[key] = value;
      }
    }

    return await this.linkRepository.save(link);
  }

  delete(uid: number, gid: number): Promise<void> {
    return this.linkRepository
      .delete({
        user: uid,
        id: gid,
      })
      .then(null);
  }
}
