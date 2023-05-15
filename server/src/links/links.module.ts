import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import LinkEntity from '../entities/link.entity';

@Module({
  controllers: [LinksController],
  providers: [LinksService],
  imports: [TypeOrmModule.forFeature([LinkEntity])],
  exports: [LinksService],
})
export class LinksModule {}
