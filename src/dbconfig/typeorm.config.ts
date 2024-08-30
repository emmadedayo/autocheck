import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'autochek.db',
  synchronize: false, // Set to false in production
  logging: true,
  entities: [__dirname + '/entity/*{.js,.ts}'],
  migrations: [__dirname + '/migration/*{.js,.ts}'],
  migrationsTableName: 'migrations',
  namingStrategy: new SnakeNamingStrategy(),
});
