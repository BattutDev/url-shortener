import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import * as NestConfig from '@nestjs/config';
import { AuthMiddleware } from './auth/auth.middleware';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [
    DatabaseModule,
    NestConfig.ConfigModule.forRoot({ envFilePath: '.env' }),
    UsersModule,
    GroupsModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('users', 'groups');
  }
}
