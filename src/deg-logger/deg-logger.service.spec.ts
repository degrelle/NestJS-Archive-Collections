import { Test, TestingModule } from '@nestjs/testing';
import { DegLoggerService } from './deg-logger.service';

describe('DegLoggerService', () => {
  let service: DegLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DegLoggerService],
    }).compile();

    service = module.get<DegLoggerService>(DegLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
