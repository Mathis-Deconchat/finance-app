import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { SpendingEntity } from '../spending/entities/spending.entity';

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ default: '' })
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column({ default: '' })
    bio: string;

    @Column({ default: '' })
    image: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 12);
    }

    @OneToMany(type => SpendingEntity, spending => spending.user)
    spendings: SpendingEntity[];
}