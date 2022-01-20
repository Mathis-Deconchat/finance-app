import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from "bcrypt";
import { UserEntity } from '../users/users.entity';


@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) {

    }

    private async comparePassword(enteredPassword, dbPassword) {
        return bcrypt.compare(enteredPassword, dbPassword);
    }

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
}
