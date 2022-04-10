import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

  public async getAllComments(): Promise<CommentDto[]> {
    return this.commentRepository.find();
  }

  public async getCommentById(id: string): Promise<CommentDto> {
    return this.commentRepository.findOne(id);
  }

  public async createComment(comment: CommentDto): Promise<CommentDto> {
    return this.commentRepository.save(comment);
  }

  public async updateComment(id: string, comment: CommentDto): Promise<void> {
    await this.commentRepository.update(id, comment);
  }

  public async deleteComment(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
