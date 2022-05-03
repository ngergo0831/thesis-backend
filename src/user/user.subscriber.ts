import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection, @Inject(CACHE_MANAGER) private cacheManager: Cache) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeUpdate(event: UpdateEvent<User>): Promise<void> {
    await this.cacheManager.del(`user_${event.entity.id}`);
    await this.cacheManager.del('users');
  }

  async beforeInsert(event: InsertEvent<User>): Promise<void> {
    await this.cacheManager.del(`user_${event.entity.id}`);
    await this.cacheManager.del('users');
  }
}
