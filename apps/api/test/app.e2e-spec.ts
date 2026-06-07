import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

interface RootResponse {
  name: string;
  routes: {
    docs: string;
    dashboard: string;
  };
}

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let server: Parameters<typeof request>[0];

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer() as Parameters<typeof request>[0];
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(server)
      .get('/')
      .expect(200)
      .expect(({ body }) => {
        const response = body as RootResponse;

        expect(response.name).toBe('web-experiment api');
        expect(response.routes.docs).toBe('/docs');
        expect(response.routes.dashboard).toBe('/commerce/dashboard');
      });
  });

  it('/commerce/customers/top (GET)', async () => {
    const response = await request(server)
      .get('/commerce/customers/top?limit=3')
      .expect(200);

    expect(response.body).toMatchSnapshot();
  });

  it('/commerce/products/best-sellers (GET)', async () => {
    const response = await request(server)
      .get('/commerce/products/best-sellers?limit=3')
      .expect(200);

    expect(response.body).toMatchSnapshot();
  });
});
