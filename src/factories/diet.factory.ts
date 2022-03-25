import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Diet } from '../diet/diet.entity';
import { Period } from '../enum/period.enum';

define(
  Diet,
  (faker: typeof Faker) =>
    new Diet({
      period: faker.random.arrayElement(Object.values(Period))
    })
);
