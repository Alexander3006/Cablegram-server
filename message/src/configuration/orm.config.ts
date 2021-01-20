import { ConnectionOptions } from 'typeorm';
import * as path from 'path';

const {
  POSTGRES_DB_HOST,
  POSTGRES_DB_PORT,
  POSTGRES_DB_USER,
  POSTGRES_DB_PASSWORD,
  POSTGRES_DB_NAME,
} = process.env;

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: POSTGRES_DB_HOST,
  port: parseInt(POSTGRES_DB_PORT, 10),
  username: POSTGRES_DB_USER,
  password: POSTGRES_DB_PASSWORD,
  database: POSTGRES_DB_NAME,
  entities: [
    path.join(
      __dirname,
      `../infrastructure/dataAccess/entities/*.entity.{ts,js}`,
    ),
  ],
  synchronize: false,
  dropSchema: false,
  migrationsRun: true,
  logging: ['warn', 'error'],
  logger: 'debug',
  migrations: [path.join(__dirname, `../migrations/*.{ts,js}`)],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export default connectionOptions;

export const getOrmConfig = () => {
  return {
    db: {
      options: connectionOptions,
    },
  };
};
