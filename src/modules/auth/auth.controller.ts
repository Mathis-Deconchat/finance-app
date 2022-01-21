import { Body, Controller, Logger, Post, Request, UseGuards, Get, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DoesUserExist } from 'src/core/guards/does-user-exist.guard';
import { IfEmailIsOk } from 'src/core/guards/if-email-is-ok.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UserEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { LocalAuthGuard } from './local-auth.guards';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly userService: UsersService,
        private authService: AuthService
    ) { }

    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        Logger.log(req)
        return this.authService.login(req.user);
    }

    @Post('register')
    @UseGuards(DoesUserExist)
    @UseGuards(IfEmailIsOk)
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.createNewUser(createUserDto)
    }

    @Get('protected')
    @UseGuards(JwtGuard)
    async protectedRoute(@Request() req): Promise<any> {
        return req.user.id;
    }
}
