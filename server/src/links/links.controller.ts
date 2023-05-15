import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { LinksService } from './links.service';
import { GetUser } from '../users/user.context';
import LinkEntity from '../entities/link.entity';
import { PatchLinkBodyType, PostLinkBodyType } from './links.type';

@Controller('links')
export class LinksController {
  constructor(private readonly service: LinksService) {}

  @Get('/')
  getAll(@GetUser() user): Promise<Array<LinkEntity>> {
    return this.service.getAll(user.id);
  }

  @Get('/:id')
  get(@GetUser() user, @Param() { id }): Promise<LinkEntity> {
    return this.service.get(user.id, id);
  }

  @Post('/')
  create(@GetUser() user, @Body() body: PostLinkBodyType): Promise<LinkEntity> {
    return this.service.insert(user.id, body);
  }

  @Patch('/:id')
  update(
    @GetUser() user,
    @Body() body: PatchLinkBodyType,
    @Param() { id },
  ): Promise<LinkEntity> {
    return this.service.update(user.id, id, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@GetUser() user, @Param() { id }): Promise<void> {
    return this.service.delete(user.id, id);
  }
}
