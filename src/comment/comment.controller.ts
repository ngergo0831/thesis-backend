import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  public async getAllComments(): Promise<CommentDto[]> {
    return this.commentService.getAllComments();
  }

  @Get('/:id')
  public async getCommentById(@Param('id') id: string): Promise<CommentDto> {
    const comment = await this.commentService.getCommentById(id);

    if (!comment) {
      throw new NotFoundException(`Comment not found with id ${id}`);
    }

    return comment;
  }

  @Post()
  public async createComment(@Body() comment: CommentDto): Promise<CommentDto> {
    return this.commentService.createComment(comment);
  }

  @Patch(':id')
  @HttpCode(204)
  public async updateComment(@Param('id') id: string, @Body() comment: CommentDto): Promise<void> {
    const commentToUpdate = await this.commentService.getCommentById(id);

    if (!id || !commentToUpdate) {
      throw new NotFoundException(`Comment not found with id ${id}`);
    }

    await this.commentService.updateComment(id, comment);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteComment(@Param('id') id: string): Promise<void> {
    const commentToDelete = await this.commentService.getCommentById(id);

    if (!id || !commentToDelete) {
      throw new NotFoundException(`Comment not found with id ${id}`);
    }

    await this.commentService.deleteComment(id);
  }
}
