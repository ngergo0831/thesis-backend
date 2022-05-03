import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm';
import { Intake } from './intake.entity';

@EventSubscriber()
export class IntakeSubscriber implements EntitySubscriberInterface<Intake> {
  constructor(connection: Connection, @Inject(CACHE_MANAGER) private cacheManager: Cache) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Intake;
  }

  async beforeUpdate(_event: UpdateEvent<Intake>): Promise<void> {
    await this.cacheManager.del('intakes');
  }

  async beforeInsert(_event: InsertEvent<Intake>): Promise<void> {
    await this.cacheManager.del('intakes');
  }
}
