import { UserEntity } from "src/modules/users/users.entity";

export interface UserTokenReturn {
    token: string,
    user: Partial<UserEntity>
}