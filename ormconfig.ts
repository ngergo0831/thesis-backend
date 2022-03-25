import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

const ormconfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'thesis',
  synchronize: false,
  entities: [join(__dirname, '..', '**', '*.entity*{.ts,.js}')],
  logging: false,
  migrations: [join(__dirname, '..', 'migrations', '*{.ts,.js}')],
  migrationsTableName: 'migration',
  cli: {
    migrationsDir: 'src/migrations'
  }
};

export default ormconfig;
