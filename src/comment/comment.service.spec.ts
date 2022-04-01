import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

describe('CommentService', () => {
  let service: CommentService;
  let repository: Repository<Comment>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: 'CommentRepository',
          useClass: Repository
        }
      ]
    }).compile();

    service = module.get<CommentService>(CommentService);
    repository = module.get<Repository<Comment>>(getRepositoryToken(Comment));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
