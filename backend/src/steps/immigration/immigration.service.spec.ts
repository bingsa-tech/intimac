import { Test, TestingModule } from '@nestjs/testing';
import { ImmigrationService } from './immigration.service';

describe('ImmigrationService', () => {
  let service: ImmigrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImmigrationService],
    }).compile();

    service = module.get<ImmigrationService>(ImmigrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
