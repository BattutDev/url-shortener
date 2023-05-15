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
import { GroupsService } from './groups.service';
import { GetUser } from '../users/user.context';
import GroupEntity from '../entities/group.entity';
import { PatchGroupBodyType, PostGroupBodyType } from './groups.type';

@Controller('groups')
export class GroupsController {
  constructor(private readonly service: GroupsService) {}

  @Get('/')
  getAll(@GetUser() user): Promise<Array<GroupEntity>> {
    return this.service.getAll(user.id);
  }

  @Get('/:id')
  get(@GetUser() user, @Param() { id }): Promise<GroupEntity> {
    return this.service.get(user.id, id);
  }

  @Post('/')
  create(
    @GetUser() user,
    @Body() body: PostGroupBodyType,
  ): Promise<GroupEntity> {
    return this.service.insert(user.id, body);
  }

  @Patch('/:id')
  update(
    @GetUser() user,
    @Body() body: PatchGroupBodyType,
    @Param() { id },
  ): Promise<GroupEntity> {
    return this.service.update(user.id, id, body);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@GetUser() user, @Param() { id }): Promise<void> {
    return this.service.delete(user.id, id);
  }
}
