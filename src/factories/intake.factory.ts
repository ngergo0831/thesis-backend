import { define } from 'typeorm-seeding';
import { Intake } from '../intake/intake.entity';

define(Intake, () => {
  const fat = Math.floor(Math.random() * (300 - 0 + 1)) + 0;
  const protein = Math.floor(Math.random() * (300 - 0 + 1)) + 0;
  const carbs = Math.floor(Math.random() * (300 - 0 + 1)) + 0;

  return new Intake({
    calorie: fat * 9 + protein * 4 + carbs * 4,
    fat,
    protein,
    carbs
  });
});
