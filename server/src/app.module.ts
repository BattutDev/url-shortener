import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import * as NestConfig from '@nestjs/config';
import { AuthMiddleware } from './auth/auth.middleware';
import { GroupsModule } from './groups/groups.module';
import { ConfigModule } from '@nestjs/config';
import { LinksModule } from './links/links.module';
import { AppService } from './app.service';

@Module({
  imports: [
    DatabaseModule,
    NestConfig.ConfigModule.forRoot({ envFilePath: '.env' }),
    UsersModule,
    GroupsModule,
    ConfigModule.forRoot(),
    LinksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('users', 'groups', 'links');
  }
}
