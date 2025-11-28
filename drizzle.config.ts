// eslint-disable-next-line @typescript-eslint/no-require-imports
require('dotenv').config();

import { config } from 'dotenv';

// Load environment-specific config
const env = process.env.NODE_ENV || 'development';
config({ path: `.env.${env}` });
console.log(process.env.TURSO_DATABASE_URL);

export default {
  schema: './src/database/schema.ts',
  out: './src/database/migrations',
  dialect: 'turso',
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
};
