import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/users.entity';
import { LocalStrategy } from './local.strategy';
import { LocalAuthGuard } from './local-auth.guards';

@Module({
  imports: [PassportModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [AuthService, UsersService, LocalStrategy],
  controllers: [AuthController]
})
export class AuthModule { }
