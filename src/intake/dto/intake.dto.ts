import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsInt, Min, Max, IsOptional } from 'class-validator';

export class IntakeDto implements IIntake {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10000)
  calorie: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1000)
  fat: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1000)
  carbs: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(1000)
  protein: number;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  userId: string;
}

export interface IIntake {
  calorie: number;
  fat: number;
  carbs: number;
  protein: number;
  userId: string;
}
