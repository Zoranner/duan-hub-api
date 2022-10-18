import { Test, TestingModule } from '@nestjs/testing';
import { HistoryUserRelService } from './history_user_rel.service';

describe('HistoryUserRelService', () => {
  let service: HistoryUserRelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryUserRelService],
    }).compile();

    service = module.get<HistoryUserRelService>(HistoryUserRelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
