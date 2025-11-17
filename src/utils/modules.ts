import { DrizzleTursoModule } from '@knaadh/nestjs-drizzle-turso';
import * as schema from '@pinpoint/database/schema';

console.log('DRIZZLE MODULE');
export const DrizzleTursoModuleForRoot = DrizzleTursoModule.register({
  tag: 'DB',
  turso: {
    config: {
      url: process.env.TURSO_DATABASE_URL || '',
      authToken: process.env.TURSO_AUTH_TOKEN,
    },
  },
  config: { schema: { ...schema } },
});
