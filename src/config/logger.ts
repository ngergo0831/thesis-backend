import * as winston from 'winston';
import { Logger, QueryRunner } from 'typeorm';
import * as rTracer from 'cls-rtracer';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';

const isMorgan = (message) => {
  if (!message || message[0] !== '{') {
    return { morgan: false };
  }

  try {
    const parsed = JSON.parse(message);

    return { morgan: !!parsed.morgan, parsed };
  } catch {
    return { morgan: false };
  }
};

const environmentFilterForMorgan = (key) =>
  ['status', 'method', 'url', 'userId', 'response-time'].includes(key);

const getMetaData = winston.format((info) => {
  const { morgan, parsed } = isMorgan(info.message);

  info['requestId'] = rTracer.id();

  if (morgan) {
    info.context = 'Request';

    for (const key of Object.keys(parsed).filter(environmentFilterForMorgan)) {
      info[key] = parsed[key];
    }

    //omit the original message, to avoid duplication
    info.message = '';
  }

  if (info['status']) {
    info.level = info['status'] >= 400 ? 'error' : 'info';
  }

  return info;
});

const developmentFormat = [
  winston.format.simple(),
  nestWinstonModuleUtilities.format.nestLike('Thesis', { prettyPrint: true })
];

const environmentSpecific = developmentFormat;

export const logger = WinstonModule.createLogger({
  format: winston.format.combine(
    getMetaData(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    ...environmentSpecific
  ),
  transports: [new winston.transports.Console()]
});

export class TypeOrmLogger implements Logger {
  log(level: 'log' | 'info' | 'warn', message: any, queryRunner?: QueryRunner): any {
    try {
      const parsed = typeof message === 'string' ? message : JSON.stringify(message);
      if (level === 'warn') {
        logger.warn(parsed, { requestId: rTracer.id() });
      } else {
        logger.log(parsed, { level, requestId: rTracer.id() });
      }
    } catch (error) {
      console.error({ 'TypeOrmLogger: ': error });
      logger.warn('TypeOrmLoggerError', error);
    }
  }

  logMigration(message: string, queryRunner?: QueryRunner): any {
    logger.log(message);
  }

  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    logger.log(query, { parameters, requestId: rTracer.id() });
  }

  logQueryError(error: string, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    logger.error(error, { query, parameters });
  }

  logQuerySlow(time: number, query: string, parameters?: any[], queryRunner?: QueryRunner): any {
    logger.log(query);
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner): any {
    logger.log(message);
  }
}
