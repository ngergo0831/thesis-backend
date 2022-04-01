import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comment) private commentRepository: Repository<Comment>) {}

  public async getAllComments(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  public async getCommentById(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne(id);

    if (!comment) {
      throw new NotFoundException(`Comment not found with id ${id}`);
    }

    return comment;
  }
}
