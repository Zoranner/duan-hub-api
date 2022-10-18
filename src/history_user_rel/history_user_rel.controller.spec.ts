import { Test, TestingModule } from '@nestjs/testing';
import { HistoryUserRelController } from './history_user_rel.controller';

describe('HistoryUserRelController', () => {
  let controller: HistoryUserRelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryUserRelController],
    }).compile();

    controller = module.get<HistoryUserRelController>(HistoryUserRelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
