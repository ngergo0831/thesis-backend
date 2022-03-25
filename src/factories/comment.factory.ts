import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Comment } from '../comment/comment.entity';

define(
  Comment,
  (faker: typeof Faker) =>
    new Comment({
      comment: faker.lorem.sentence()
    })
);
