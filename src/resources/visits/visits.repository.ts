import { Inject } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

import * as schema from '@pinpoint/database/schema';
import { PinVisitSelectType } from '@pinpoint/resources/visits/types/visits.types';

export class VisitsRepository {
  constructor(@Inject('DB') private db: LibSQLDatabase<typeof schema>) {}

  async insertVisit({
    pinId,
    userId,
    visitDate,
  }: {
    pinId: string;
    userId: string;
    visitDate: Date;
  }): Promise<PinVisitSelectType> {
    const [visit] = await this.db
      .insert(schema.pinVisits)
      .values({
        pinId,
        userId,
        visitedAt: visitDate,
      })
      .returning();
    if (!visit) {
      throw new Error('Failed to create visit');
    }
    return visit;
  }
}
