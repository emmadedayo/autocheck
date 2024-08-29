import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export class TypeOrmConfig {
  static getOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: 'autochek.db',
      synchronize: false, // Set to false in production
      logging: true,
      entities: [__dirname + '/entity/*{.js,.ts}'],
      migrations: [__dirname + '/migration/*{.js,.ts}'],
      migrationsTableName: 'migrations',
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
