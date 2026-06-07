import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return app metadata', () => {
      expect(appController.getAppInfo()).toEqual(
        expect.objectContaining({
          name: 'web-experiment api',
          database: 'web-experiment-db',
          dataset: 'civilian7/sql-tutorial small ko',
        }),
      );
    });
  });
});
