import { CacheModule, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Diet } from '../diet/diet.entity';
import { DietService } from '../diet/diet.service';
import { IntakeController } from './intake.controller';
import { Intake } from './intake.entity';
import { IntakeService } from './intake.service';

jest.mock('./intake.service.ts');

describe('IntakeController', () => {
  let controller: IntakeController;
  let service: IntakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [IntakeController],
      providers: [
        IntakeService,
        DietService,
        {
          provide: getRepositoryToken(Diet),
          useValue: {}
        }
      ]
    }).compile();

    controller = module.get<IntakeController>(IntakeController);
    service = module.get<IntakeService>(IntakeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllIntakes', () => {
    it('should call getAllIntakes', async () => {
      const getAllIntakesSpy = jest
        .spyOn(service, 'getAllIntakes')
        .mockResolvedValue([] as Intake[]);

      await controller.getAllIntakes();

      expect(getAllIntakesSpy).toHaveBeenCalledTimes(1);
    });

    it('should return an array of Intakes', async () => {
      const mockedIntakes = [new Intake()];

      jest.spyOn(service, 'getAllIntakes').mockResolvedValue(mockedIntakes);

      const result = await controller.getAllIntakes();

      expect(result).toBe(mockedIntakes);
    });
  });

  describe('getIntakeById', () => {
    it('should call getIntakeById', async () => {
      const getIntakeByIdSpy = jest.spyOn(service, 'getIntakeById').mockResolvedValue(new Intake());

      await controller.getIntakeById('1');

      expect(getIntakeByIdSpy).toHaveBeenCalledTimes(1);
    });

    it('should return a Intake if exists', async () => {
      const mockedIntake = new Intake({ id: '1' });

      jest.spyOn(service, 'getIntakeById').mockResolvedValue(mockedIntake);

      const result = await controller.getIntakeById('1');

      expect(result).toBe(mockedIntake);
    });

    it('should throw NotFoundException when no Intake found with given id', async () => {
      jest.spyOn(service, 'getIntakeById').mockResolvedValue(undefined);

      const resultPromise = controller.getIntakeById('1');

      await expect(resultPromise).rejects.toThrowError(NotFoundException);
    });
  });
});
