import { Module } from '@nestjs/common';
import { SpendingService } from './spending.service';
import { SpendingController } from './spending.controller';
import { SpendingEntity } from './entities/spending.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { UserEntity } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SpendingEntity, UserEntity]), UsersModule],
  controllers: [SpendingController],
  providers: [SpendingService, JwtStrategy, UsersService]
})
export class SpendingModule { }
