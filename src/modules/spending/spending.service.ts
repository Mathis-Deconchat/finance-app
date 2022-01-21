import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { UserEntity } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { CreateSpendingDto, UpdateSpendingDto } from './dto';
import { SpendingEntity } from './entities/spending.entity';
import { v4 as uuidv4 } from 'uuid';
import { stringify } from 'querystring';


@Injectable()
export class SpendingService {
  constructor
    (
      private usersService: UsersService,

      @InjectRepository(SpendingEntity)
      private spendingRepo: Repository<SpendingEntity>,

      @InjectRepository(UserEntity)
      private userRepo: Repository<UserEntity>

    ) { }

  /**   * 
   * Used to create a spending, it takes the userId from the decoded JWT token to link the spending to a user
   * @param userId 
   * @param spendingData 
   * @returns {newSpending}   
   */
  async create(userId: number, spendingData: CreateSpendingDto) {

    try {
      let spending = new SpendingEntity();
      spending.amount = spendingData.amount;
      spending.title = spendingData.title;
      spending.description = spendingData.description;
      spending.slug = await this.slugify(spendingData.title);

      const newSpending = await this.spendingRepo.save(spending);
      const user = await this.userRepo.findOne({ where: { id: userId }, relations: ['spendings'] });
      user.spendings.push(spending);

      await this.userRepo.save(user);

      return newSpending;

    } catch (error) {
      throw new HttpException("Error while creating spending", 500);
    }

  }

  /**
   * Convert a string into a slug and add an unique UUID
   * @async
   * @param toSlug 
   * @returns string
   */
  async slugify(toSlug: string): Promise<string> {
    return toSlug.toLowerCase().replace(/\s+/g, "-") + "-" + uuidv4();
  }

  /** return all spendings and theirs users
   * @async
   * @returns 
   */
  async findAll() {
    const dbQuery = getRepository(SpendingEntity)
      .createQueryBuilder('spending')
      .leftJoinAndSelect('spending.user', 'user')

    return dbQuery.getMany();
  }

  async findOne(where): Promise<SpendingEntity> {
    return this.spendingRepo.findOne(where);
  }

  async update(slug: string, spendingData: UpdateSpendingDto): Promise<SpendingEntity> {
    try {
      let toUpdate = await this.spendingRepo.findOne({ slug: slug });
      let updated = Object.assign(toUpdate, spendingData);
      updated.slug = await this.slugify(spendingData.title);
      return this.spendingRepo.save(updated);
    } catch (error) {
      Logger.log(error)
      throw new HttpException(error, 500)
    }

  }

  remove(id: number) {
    return `This action removes a #${id} spending`;
  }
}
