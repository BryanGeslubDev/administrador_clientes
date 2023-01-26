import * as dotenv from 'dotenv';

dotenv.config();

const {
  PORT = 4000,
  HOST = 'localhost',
  ADMIN_CLIENT_PORT = 5432,
  USER = 'postgres',
  PASS = 'geslub',
  DIALECT = 'postgres',
  NAME = 'administrator_clients',
} = process.env;

export const SYSTEM = {
  PORT: PORT,
  HOST: HOST,
};

export const DATABASE = {
  HOST,
  PORT: ADMIN_CLIENT_PORT,
  USER,
  PASS,
  NAME,
  DIALECT,
};
