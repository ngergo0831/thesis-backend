import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Measurement } from './measurement.entity';
import { MeasurementService } from './measurement.service';

describe('MeasurementService', () => {
  let service: MeasurementService;
  let repository: Repository<Measurement>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeasurementService,
        {
          provide: 'MeasurementRepository',
          useClass: Repository
        }
      ]
    }).compile();

    service = module.get<MeasurementService>(MeasurementService);
    repository = module.get<Repository<Measurement>>(getRepositoryToken(Measurement));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
