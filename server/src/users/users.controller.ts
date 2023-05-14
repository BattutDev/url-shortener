import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { GetToken, GetUser } from './user.context';
import { UserSessionType } from '../entities/user.entity';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Get('@me')
  public getMe(@GetUser() user: UserSessionType) {
    return user;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  logout(@GetToken() token: string): Promise<null> {
    return this.usersService.logout(token);
  }
}
