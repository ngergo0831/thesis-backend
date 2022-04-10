import { ApiProperty } from '@nestjs/swagger';
import { Max, Min, IsUUID, IsNotEmpty, IsOptional } from 'class-validator';

export class MeasurementDto implements IMeasurement {
  @ApiProperty()
  @Max(200)
  @Min(40)
  @IsNotEmpty()
  weight: number;

  @ApiProperty()
  @IsUUID()
  @IsOptional()
  userId: string;
}

export interface IMeasurement {
  weight: number;
  userId: string;
}
