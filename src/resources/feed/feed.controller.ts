import { Controller, Get, Query, UseGuards, UsePipes } from '@nestjs/common';
import { FeedService } from './feed.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { feedQuerySchema } from './schemas/feed.schemas';

@Controller('feed')
@UseGuards(JwtAuthGuard)
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Get()
  @UsePipes(new ZodValidationPipe(feedQuerySchema.partial()))
  getFeed(@Query() query: any) {
    const limit = query.limit || 50;
    const offset = query.offset || 0;
    // return this.feedService.getFeed(limit, offset);
  }
}
