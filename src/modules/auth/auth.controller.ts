import { Body, Controller, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DoesUserExist } from 'src/core/guards/does-user-exist.guard';
import { IfEmailIsOk } from 'src/core/guards/if-email-is-ok.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './local-auth.guards';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UsersService) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return req.user;
    }

    @Post('register')
    @UseGuards(DoesUserExist)
    @UseGuards(IfEmailIsOk)
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }
}
