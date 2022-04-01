import { Injectable } from '@nestjs/common';
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
    return this.commentRepository.findOne(id);
  }
}
