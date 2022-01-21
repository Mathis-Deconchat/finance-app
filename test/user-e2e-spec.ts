import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection } from 'typeorm';
import { UsersModule } from '../src/modules/users/users.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../src/modules/users/users.entity';

describe('UserController (e2e)', () => {
    let app: INestApplication;
    let connection: Connection;
    let moduleFixture: TestingModule;

    const mockUsersRepository = {

    }

    beforeAll(async () => {
        moduleFixture = await Test.createTestingModule({
            imports: [UsersModule]
        }).compile()
        connection = moduleFixture.get(Connection)

        app = moduleFixture.createNestApplication();

        await app.init()
    })

    afterAll(async () => {
        moduleFixture.close();
    })

    it('/users (GET)', () => {
        return request(app.getHttpServer())
            .get('/users')
            .expect(200);

    })


});
