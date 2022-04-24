import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DietController } from './diet.controller';
import { Diet } from './diet.entity';
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

  describe('getAllDiets', () => {
    it('should call getAllDiets', async () => {
      const getAllDietsSpy = jest.spyOn(service, 'getAllDiets').mockResolvedValue([] as Diet[]);

      await controller.getAllDiets('1');

      expect(getAllDietsSpy).toHaveBeenCalledTimes(1);
    });

    it('should return an array of Diets', async () => {
      const mockedDiets = [new Diet()];

      jest.spyOn(service, 'getAllDiets').mockResolvedValue(mockedDiets);

      const result = await controller.getAllDiets('1');

      expect(result).toBe(mockedDiets);
    });
  });

  describe('getDietById', () => {
    it('should call getDietById', async () => {
      const getDietByIdSpy = jest.spyOn(service, 'getDietById').mockResolvedValue(new Diet());

      await controller.getDietById('1');

      expect(getDietByIdSpy).toHaveBeenCalledTimes(1);
    });

    it('should return a Diet if exists', async () => {
      const mockedDiet = new Diet({ id: '1' });

      jest.spyOn(service, 'getDietById').mockResolvedValue(mockedDiet);

      const result = await controller.getDietById('1');

      expect(result).toBe(mockedDiet);
    });

    it('should throw NotFoundException when no Diet found with given id', async () => {
      jest.spyOn(service, 'getDietById').mockResolvedValue(undefined);

      const resultPromise = controller.getDietById('1');

      await expect(resultPromise).rejects.toThrowError(NotFoundException);
    });
  });
});
