import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class CommentDto implements IComment {
  @IsString()
  @ApiProperty()
  comment: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  userId: string;

  @IsUUID()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  dietId: string;
}

export interface IComment {
  comment: string;
  userId: string;
  dietId: string;
}
