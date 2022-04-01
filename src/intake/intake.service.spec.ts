import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Intake } from './intake.entity';
import { IntakeService } from './intake.service';

describe('IntakeService', () => {
  let service: IntakeService;
  let repository: Repository<Intake>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IntakeService,
        {
          provide: 'IntakeRepository',
          useClass: Repository
        }
      ]
    }).compile();

    service = module.get<IntakeService>(IntakeService);
    repository = module.get<Repository<Intake>>(getRepositoryToken(Intake));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
