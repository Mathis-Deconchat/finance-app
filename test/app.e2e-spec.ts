import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { Connection } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;


  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = moduleFixture.createNestApplication();

    await app.init()

    if (process.env.NODE_ENV === 'test') {
      const connection = app.get(Connection)
      await connection.synchronize(true)

    }

  })

  let jwtToken: string

  it('authenticates a user and includes a jwt token in the response', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test@example.com', password: 'password' })
      .expect(200)

    // save the access token for subsequent tests
    jwtToken = response.body.accessToken

    // ensure a JWT token is included in the response    
    expect(jwtToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/) // jwt regex
  })
});
