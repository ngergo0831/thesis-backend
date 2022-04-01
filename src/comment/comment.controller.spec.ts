import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

jest.mock('./comment.service.ts');

describe('CommentController', () => {
  let controller: CommentController;
  let service: CommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [CommentService]
    }).compile();

    controller = module.get<CommentController>(CommentController);
    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllComments', () => {
    it('should call getAllComments', async () => {
      const getAllCommentsSpy = jest
        .spyOn(service, 'getAllComments')
        .mockResolvedValue([] as Comment[]);

      await controller.getAllComments();

      expect(getAllCommentsSpy).toHaveBeenCalledTimes(1);
    });

    it('should return an array of comments', async () => {
      const mockedComments = [new Comment()];

      jest.spyOn(service, 'getAllComments').mockResolvedValue(mockedComments);

      const result = await controller.getAllComments();

      expect(result).toBe(mockedComments);
    });
  });

  describe('getCommentById', () => {
    it('should call getCommentById', async () => {
      const getCommentByIdSpy = jest
        .spyOn(service, 'getCommentById')
        .mockResolvedValue(new Comment());

      await controller.getCommentById('1');

      expect(getCommentByIdSpy).toHaveBeenCalledTimes(1);
    });

    it('should return a comment if exists', async () => {
      const mockedComment = new Comment({ id: '1' });

      jest.spyOn(service, 'getCommentById').mockResolvedValue(mockedComment);

      const result = await controller.getCommentById('1');

      expect(result).toBe(mockedComment);
    });

    it('should throw NotFoundException when no comment found with given id', async () => {
      jest.spyOn(service, 'getCommentById').mockResolvedValue(undefined);

      const resultPromise = controller.getCommentById('1');

      await expect(resultPromise).rejects.toThrowError(NotFoundException);
    });
  });
});
