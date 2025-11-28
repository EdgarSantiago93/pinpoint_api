import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedRepository } from './feed.repository';
import { FeedService } from './feed.service';

@Module({
  imports: [],
  controllers: [FeedController],
  providers: [FeedService, FeedRepository],
  exports: [FeedService],
})
export class FeedModule {}
