import { Test, TestingModule } from '@nestjs/testing';
import { VinService } from './vin.service';

describe('VinService', () => {
  let service: VinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VinService],
    }).compile();

    service = module.get<VinService>(VinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
