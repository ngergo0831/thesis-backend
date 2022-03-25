import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../user/user.entity';
import { Gender } from '../enum/gender.enum';

define(
  User,
  (faker: typeof Faker) =>
    new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      weight: Math.floor(Math.random() * (150 - 40 + 1)) + 40,
      height: Math.floor(Math.random() * (200 - 140 + 1)) + 140,
      DOB: faker.date.between('1960-01-01', '2000-01-05'),
      gender: faker.random.arrayElement(Object.values(Gender))
    })
);
