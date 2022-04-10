import { ApiProperty } from '@nestjs/swagger';
import { Period } from '../../enum/period.enum';
import { Intake } from '../../intake/intake.entity';
import { IsEnum } from 'class-validator';

export class DietDto implements IDiet {
  @ApiProperty({ type: Intake })
  intake: Intake;

  @IsEnum(Period)
  @ApiProperty({ enum: Period })
  period: Period;

  @ApiProperty()
  creatorId: string;
}

export interface IDiet {
  intake: Intake;
  period?: Period;
  creatorId: string;
}
