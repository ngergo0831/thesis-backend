import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementController } from './measurement.controller';
import { MeasurementService } from './measurement.service';

jest.mock('./measurement.service.ts');

describe('MeasurementController', () => {
  let controller: MeasurementController;
  let service: MeasurementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MeasurementController],
      providers: [MeasurementService]
    }).compile();

    controller = module.get<MeasurementController>(MeasurementController);
    service = module.get<MeasurementService>(MeasurementService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
