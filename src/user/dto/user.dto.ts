import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, Min, Max, IsEnum, IsDate } from 'class-validator';
import { Gender } from '../../enum/gender.enum';

export class UserDto implements IUser {
  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @Max(200)
  @Min(40)
  @IsOptional()
  weight?: number;

  @ApiProperty()
  @Max(200)
  @Min(40)
  @IsOptional()
  height?: number;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender?: Gender;

  @ApiProperty()
  @IsDate()
  DOB?: Date;
}

export interface IUser {
  firstName?: string;
  lastName?: string;
  email: string;
  weight?: number;
  height?: number;
  gender?: Gender;
  DOB?: Date;
}
