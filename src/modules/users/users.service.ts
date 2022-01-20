import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ) { }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepo.find();
    }

    async findByEmail(name: string): Promise<UserEntity> {
        return this.userRepo.findOne({ where: { email: name } });
    }

    async createUser(createUserDto: CreateUserDto) {
        const user: UserEntity = new UserEntity();
        const { password, username, email } = createUserDto;

        // Create user with networks param from CreateUserDto
        user.password = password;
        user.username = username;
        user.email = email;

        // Create the
        await this.userRepo.save(user)

        return user;

    }
}
