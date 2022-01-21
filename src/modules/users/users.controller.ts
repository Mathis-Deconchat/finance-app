import { Body, Controller, Delete, Get, Param, Put, Request, UseGuards } from '@nestjs/common';
import { request } from 'http';
import { DeleteResult } from 'typeorm';
import { JwtGuard } from '../auth/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './users.entity';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) { }

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Get(":email")
    findByEmail(@Param("email") email: string) {
        return this.userService.findByEmail(email);
    }


    @Put()
    @UseGuards(JwtGuard)
    async updateUser(@Request() req, @Body() userData: UpdateUserDto): Promise<UserEntity> {
        return this.userService.update(req.user.id, userData);
    }

    @Delete()
    @UseGuards(JwtGuard)
    async deleteUser(@Request() req): Promise<DeleteResult> {
        return this.userService.delete(req.user.id);
    }




}
