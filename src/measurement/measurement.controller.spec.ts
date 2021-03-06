import { CacheModule, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MeasurementController } from './measurement.controller';
import { Measurement } from './measurement.entity';
import { MeasurementService } from './measurement.service';

jest.mock('./measurement.service.ts');

describe('MeasurementController', () => {
  let controller: MeasurementController;
  let service: MeasurementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [MeasurementController],
      providers: [MeasurementService]
    }).compile();

    controller = module.get<MeasurementController>(MeasurementController);
    service = module.get<MeasurementService>(MeasurementService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllMeasurements', () => {
    it('should call getAllMeasurements', async () => {
      const getAllMeasurementsSpy = jest
        .spyOn(service, 'getAllMeasurements')
        .mockResolvedValue([] as Measurement[]);

      await controller.getAllMeasurements('1');

      expect(getAllMeasurementsSpy).toHaveBeenCalledTimes(1);
    });

    it('should return an array of Measurements', async () => {
      const mockedMeasurements = [new Measurement()];

      jest.spyOn(service, 'getAllMeasurements').mockResolvedValue(mockedMeasurements);

      const result = await controller.getAllMeasurements('1');

      expect(result).toBe(mockedMeasurements);
    });
  });

  describe('getMeasurementById', () => {
    it('should call getMeasurementById', async () => {
      const getMeasurementByIdSpy = jest
        .spyOn(service, 'getMeasurementById')
        .mockResolvedValue(new Measurement());

      await controller.getMeasurementById('1');

      expect(getMeasurementByIdSpy).toHaveBeenCalledTimes(1);
    });

    it('should return a Measurement if exists', async () => {
      const mockedMeasurement = new Measurement({ id: '1' });

      jest.spyOn(service, 'getMeasurementById').mockResolvedValue(mockedMeasurement);

      const result = await controller.getMeasurementById('1');

      expect(result).toBe(mockedMeasurement);
    });

    it('should throw NotFoundException when no Measurement found with given id', async () => {
      jest.spyOn(service, 'getMeasurementById').mockResolvedValue(undefined);

      const resultPromise = controller.getMeasurementById('1');

      await expect(resultPromise).rejects.toThrowError(NotFoundException);
    });
  });
});
