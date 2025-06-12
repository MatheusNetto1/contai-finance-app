// data-source.ts
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { Launch } from './entities/Launch';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  username: process.env.DATABASE_USER || 'devuser',
  password: process.env.DATABASE_PASSWORD || 'devpass',
  database: process.env.DATABASE_NAME || 'devdb',
  entities: [Launch],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: false,
});