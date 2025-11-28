import { pinVisits } from '@pinpoint/database/schema';
import { InferSelectModel } from 'drizzle-orm';
import { z } from 'zod';
import { createVisitSchema } from '../schemas/visits.schemas';

export type CreateVisitInput = z.infer<typeof createVisitSchema>;

export type PinVisitSelectType = InferSelectModel<typeof pinVisits>;
