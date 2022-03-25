import { Factory, Seeder } from 'typeorm-seeding';
import { Comment } from '../comment/comment.entity';
import { Diet } from '../diet/diet.entity';
import { Measurement } from '../measurement/measurement.entity';
import { User } from '../user/user.entity';
import { Intake } from '../intake/intake.entity';

export class CreateInitialSeeds implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const users = await factory(User)().createMany(10);

    await factory(Measurement)()
      .map(async (measurement) => {
        measurement.userId = users[Math.floor(Math.random() * users.length)].id;
        return measurement;
      })
      .createMany(30);

    const diets = await factory(Diet)()
      .map(async (diet) => {
        diet.creatorId = users[Math.floor(Math.random() * users.length)].id;
        diet.likedBy = users.slice(
          Math.floor(Math.random() * users.length),
          Math.floor(Math.random() * users.length)
        );
        diet.savedBy = users.slice(
          Math.floor(Math.random() * users.length),
          Math.floor(Math.random() * users.length)
        );

        const intake = await factory(Intake)()
          .map(async (_intake) => {
            _intake.userId = users[Math.floor(Math.random() * users.length)].id;
            return _intake;
          })
          .create();

        diet.intake = intake;

        return diet;
      })
      .createMany(20);

    await factory(Comment)()
      .map(async (comment) => {
        comment.userId = users[Math.floor(Math.random() * users.length)].id;
        comment.dietId = diets[Math.floor(Math.random() * diets.length)].id;
        return comment;
      })
      .createMany(30);
  }
}
