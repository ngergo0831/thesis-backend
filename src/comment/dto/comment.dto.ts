import { ApiProperty } from '@nestjs/swagger';

export class CommentDto implements IComment {
  @ApiProperty()
  comment: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  dietId: string;
}

export interface IComment {
  comment: string;
  userId: string;
  dietId: string;
}
