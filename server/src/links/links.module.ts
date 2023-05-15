import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import LinkEntity from '../entities/link.entity';
import { GroupsModule } from '../groups/groups.module';

@Module({
  controllers: [LinksController],
  providers: [LinksService],
  imports: [TypeOrmModule.forFeature([LinkEntity]), GroupsModule],
  exports: [LinksService],
})
export class LinksModule {}
