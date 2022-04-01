import { Test, TestingModule } from '@nestjs/testing';
import { DietController } from './diet.controller';
import { DietService } from './diet.service';

jest.mock('./diet.service.ts');

describe('DietController', () => {
  let controller: DietController;
  let service: DietService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DietController],
      providers: [DietService]
    }).compile();

    controller = module.get<DietController>(DietController);
    service = module.get<DietService>(DietService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
