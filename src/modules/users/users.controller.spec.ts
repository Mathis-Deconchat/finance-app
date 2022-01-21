import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersController } from './users.controller';
import { UserEntity } from './users.entity';
import { UsersService } from './users.service';

describe('UsersController test', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const mockUserService = {
    createUser: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto
      }
    }),

    update: jest.fn((id, dto) => ({
      id,
      ...dto
    })),

    findAll: jest.fn(() => {
      return [
        {
          "id": "ed3c8baf-56e4-4aec-b5b1-fdc9097c821d",
          "username": "mathis",
          "email": "mathis.deconchat@gmail.com",
          "bio": "",
          "image": "",
        },
        {
          "id": "ed3c8baf-56e4-4aec-b5b1-fdc9097c821d",
          "username": "mathis",
          "email": "mathis.deconchat@gmail.com",
          "bio": "",
          "image": "",
        }
      ]


    })
  }


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService)
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  it('should create an user', async () => {

    const mockUser: CreateUserDto = { email: 'test@mail.com', password: 'password', username: 'testuser', bio: "Test bio" }
    expect(await usersController.createUser(mockUser))
      .toEqual({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        password: expect.any(String),
        bio: expect.any(String)
      })

    expect(mockUserService.createUser).toHaveBeenCalledWith(mockUser)
  })

  it('should update a user', async () => {
    const mockUser: UpdateUserDto = { email: 'test@mail.com', username: 'testuser', bio: "Test bio", image: "" };
    const req = {
      user: {
        id: 1
      }
    }


  })


  // it('should return an array of users', async () => {
  //   const users: UserEntity[] = [];


  // })



});
