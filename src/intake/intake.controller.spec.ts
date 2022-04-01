import { Test, TestingModule } from '@nestjs/testing';
import { IntakeController } from './intake.controller';

describe('IntakeController', () => {
  let controller: IntakeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntakeController],
    }).compile();

    controller = module.get<IntakeController>(IntakeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
