import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm';
import { Measurement } from './measurement.entity';

@EventSubscriber()
export class MeasurementSubscriber implements EntitySubscriberInterface<Measurement> {
  constructor(connection: Connection, @Inject(CACHE_MANAGER) private cacheManager: Cache) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Measurement;
  }

  async beforeUpdate(event: UpdateEvent<Measurement>): Promise<void> {
    await this.cacheManager.del(`measurements_${event.entity.userId}`);
  }

  async beforeInsert(event: InsertEvent<Measurement>): Promise<void> {
    await this.cacheManager.del(`measurements_${event.entity.userId}`);
  }
}
