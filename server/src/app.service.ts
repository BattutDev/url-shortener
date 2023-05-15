import { Injectable } from '@nestjs/common';
import { LinkMethodType } from './links/links.type';
import { LinksService } from './links/links.service';
import { Response } from 'express';

@Injectable()
export class AppService {
  constructor(private readonly linksService: LinksService) {}
  async redirect(name: string, method: LinkMethodType, res: Response) {
    const link = await this.linksService.getByName(name, method);

    if (!link)
      return res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

    return res.redirect(link.redirect);
  }
}
