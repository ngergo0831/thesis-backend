import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@ApiTags('comments')
@Controller('comments')
export class CommentController {
  constructor(
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    private readonly commentService: CommentService
  ) {}

  @Get()
  public async getAllComments(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  @Get('/:id')
  public async getCommentById(@Param('id') id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne(id);

    if (!comment) {
      throw new NotFoundException(`Comment not found with id ${id}`);
    }

    return comment;
  }
}
