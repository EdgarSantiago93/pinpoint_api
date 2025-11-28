import { Controller, Get, Query, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { FeedService } from './feed.service';
import { feedQuerySchema } from './schemas/feed.schemas';

@Controller('feed')
@UseGuards(JwtAuthGuard)
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(feedQuerySchema.partial()))
  async getFeed(
    @Query()
    query: {
      limit?: number;
      offset?: number;
    },
  ) {
    const limit = query.limit ?? 50;
    const offset = query.offset ?? 0;
    return this.feedService.getFeed(limit, offset);
  }
}
