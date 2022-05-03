import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm';
import { Diet } from './diet.entity';

@EventSubscriber()
export class DietSubscriber implements EntitySubscriberInterface<Diet> {
  constructor(connection: Connection, @Inject(CACHE_MANAGER) private cacheManager: Cache) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Diet;
  }

  async beforeUpdate(_event: UpdateEvent<Diet>): Promise<void> {
    await this.cacheManager.del('diets');
  }

  async beforeInsert(_event: InsertEvent<Diet>): Promise<void> {
    await this.cacheManager.del('diets');
  }
}
