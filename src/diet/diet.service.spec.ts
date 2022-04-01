import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diet } from './diet.entity';
import { DietService } from './diet.service';

describe('DietService', () => {
  let service: DietService;
  let repository: Repository<Diet>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DietService,

        {
          provide: 'DietRepository',
          useClass: Repository
        }
      ]
    }).compile();

    service = module.get<DietService>(DietService);
    repository = module.get<Repository<Diet>>(getRepositoryToken(Diet));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
