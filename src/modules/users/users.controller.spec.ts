import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([UserEntity])]
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService)
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an array of users', async () => {
      const users: UserEntity[] = [];
      const createUsers = (username, email) => {
        const user = new UserEntity()
        user.username = username;
        user.email = email;
        return user;
      }
      users.push(createUsers('Alfred', 'm.h@mail.com'))

      jest.spyOn(usersService, 'findAll').mockImplementation(() => Promise.resolve(users))

      const findAllResult = await usersController.findAll();
      expect(findAllResult).toBe(users);


    })
  })
});
