import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

    async findById(id: number): Promise<UserEntity> {
        return this.userRepo.findOne({ id: id });
    }

    async createUser(createUserDto: CreateUserDto): Promise<Partial<UserEntity>> {
        const user: UserEntity = new UserEntity();
        const { password, username, email, bio } = createUserDto;

        // Create user with networks param from CreateUserDto
        user.password = password;
        user.username = username;
        user.email = email;
        user.bio = bio;

        await this.userRepo.save(user)

        return user;

    }

    async update(id: number, dto: UpdateUserDto): Promise<UserEntity> {
        let toUpdate = await this.userRepo.findOne(id);
        delete toUpdate.password;

        let updated = Object.assign(toUpdate, dto);
        return this.userRepo.save(updated);
    }

    async delete(id: number): Promise<DeleteResult> {
        return this.userRepo.delete({ id: id });
    }
}
