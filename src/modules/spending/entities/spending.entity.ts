import { IsNotEmpty } from "class-validator";
import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/users.entity";
@Entity()
export class SpendingEntity {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    @IsNotEmpty()
    spending: number

    @Column()
    description: string

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    created: Date;

    @Column({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP" })
    updated: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updated = new Date;
    }

    @ManyToOne(type => UserEntity, user => user.id)
    user: UserEntity



}
