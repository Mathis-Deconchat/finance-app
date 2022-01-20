import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class IfEmailIsOk implements CanActivate {
    constructor(private readonly userService: UsersService) { }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    async validateRequest(request) {
        if (!(request.body.email == process.env.MATHIS_EMAIL || request.body.email == process.env.CARLA_EMAIL)) {
            throw new ForbiddenException('Email not authorized to create an account');
        }
        return true;
    }
}