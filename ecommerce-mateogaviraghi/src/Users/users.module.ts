import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/Users.entity';
import { AuthService } from '../Auth/auth.service';
import { requiresAuth } from 'express-openid-connect';

@Module({
  imports:[TypeOrmModule.forFeature([Users])] ,
  controllers: [UsersController],
  providers: [UsersService, UserRepository, AuthService]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(requiresAuth()).forRoutes('users/auth0/protected')
  }
}
