import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Comment } from './comment.entity';
import { CommentService } from './comment.service';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  public async getAllComments(): Promise<Comment[]> {
    return this.commentService.getAllComments();
  }

  @Get('/:id')
  public async getCommentById(@Param('id') id: string): Promise<Comment> {
    return this.commentService.getCommentById(id);
  }
}
