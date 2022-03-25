import { define } from 'typeorm-seeding';
import { Measurement } from '../measurement/measurement.entity';

define(
  Measurement,
  () =>
    new Measurement({
      weight: Math.floor(Math.random() * (150 - 40 + 1)) + 40
    })
);
