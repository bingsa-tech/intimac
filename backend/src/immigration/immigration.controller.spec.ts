import { Test, TestingModule } from '@nestjs/testing';
import { ImmigrationController } from './immigration.controller';

describe('ImmigrationController', () => {
  let controller: ImmigrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImmigrationController],
    }).compile();

    controller = module.get<ImmigrationController>(ImmigrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
