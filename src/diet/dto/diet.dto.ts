import { ApiProperty } from '@nestjs/swagger';
import { Period } from '../../enum/period.enum';
import { IsEnum } from 'class-validator';

export class DietDto implements IDiet {
  @ApiProperty()
  intakeId: string;

  @IsEnum(Period)
  @ApiProperty({ enum: Period })
  period: Period;

  @ApiProperty()
  creatorId: string;
}

export interface IDiet {
  intakeId: string;
  period?: Period;
  creatorId: string;
}
