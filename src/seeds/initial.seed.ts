import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../user/user.entity';

export class CreateInitialSeeds implements Seeder {
  public async run(factory: Factory): Promise<void> {
    // await factory(User)().createMany(5);
    const users = await factory(User)().createMany(5);
  }
}
