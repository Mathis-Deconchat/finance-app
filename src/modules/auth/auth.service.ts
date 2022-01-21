import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt";
import { UserEntity } from '../users/users.entity';
import { JwtService } from '@nestjs/jwt';
import { resourceLimits } from 'worker_threads';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UserDataToken } from './interfaces/user-token-data.interface';
import { UserTokenReturn } from './interfaces/user-token-return.interface';



@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService) {

    }

    /** 
     * Compare les password entre la base de données et ceux saisis par l'utilisateur
     * @param enteredPassword
     * @param dbPassword
     */
    private async comparePassword(enteredPassword, dbPassword): Promise<boolean> {
        return bcrypt.compare(enteredPassword, dbPassword);
    }

    /**
     * Check if user exists in database and if given hah password correpond with database hash
     * Function used in local.strategy 
     *   
     * @param username 
     * @param pass 
     * @returns 
     */
    async validateUser(username: string, pass: string): Promise<Partial<UserEntity> | undefined> {
        const user = await this.usersService.findByEmail(username);

        if (!user) {
            return null;
        }
        const match = await this.comparePassword(pass, user.password);
        if (!match) {
            return null;
        }
        const { password, ...rest } = user;
        return rest;
    }

    /**
     * Génere le token JWT
     * @param user 
     * @returns 
     */
    async generateToken(user: UserDataToken): Promise<string> {
        return this.jwtService.signAsync(user);
    }

    /**
     * Create a new user via userService and return partial user infos with jwt token
     * @param user 
     * @returns 
     */
    async createNewUser(user): Promise<any> {
        const newUser = await this.usersService.createUser(user);
        const token = await this.generateToken(user)
        const { password, ...rest } = newUser;

        return { user: rest, token: token }
    }


    /**
     * Return user data and JWT token once user credential have been validated by local auth guard
     * Return 
     * @param user 
     * @returns 
     */
    async login(user): Promise<UserTokenReturn> {
        const { password, id, email, ...rest } = user
        const token = await this.generateToken({ id, email })
        return { token: token, user: rest };
    }







}
