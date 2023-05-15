import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { UserSessionType } from './entities/user.entity';
import { LoginReturnBodyType, UsersService } from './users/users.service';
import { Request, Response } from 'express';
import { AppService } from './app.service';

export type UserRequest = Request &
  Record<'user', UserSessionType> &
  Record<'token', string>;

export type LoginBodyType = {
  mail: string;
  password: string;
};
@Controller()
export class AppController {
  constructor(
    private readonly service: AppService,
    private readonly usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(
    @Body() { mail, password }: LoginBodyType,
  ): Promise<LoginReturnBodyType> {
    return this.usersService.login(mail, password);
  }

  @Get('/:name')
  getNormalLink(@Param() { name }, @Res() res: Response): Promise<void> {
    return this.service.redirect(name, 'normal', res);
  }

  @Get()
  getSubLink(@Req() req: Request, @Res() res: Response): Promise<void> {
    const sub: string = req.headers.host.split('.')[0] || '';
    return this.service.redirect(sub, 'subdomain', res);
  }
}
