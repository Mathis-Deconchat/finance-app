import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { DoesUserExist } from 'src/core/guards/does-user-exist.guard';
import { IfEmailIsOk } from 'src/core/guards/if-email-is-ok.guard';
import { CreateUserDto } from './dto/create-user.dto';
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


}
