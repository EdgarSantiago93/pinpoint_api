import { Module } from '@nestjs/common';
import { FeedModule } from '@pinpoint/resources/feed/feed.module';
import { PinsRepository } from '@pinpoint/resources/pins/pins.repository';
import { VisitsModule } from '@pinpoint/resources/visits/visits.module';
import { PinsController } from './pins.controller';
import { PinsService } from './pins.service';

@Module({
  imports: [VisitsModule, FeedModule],
  controllers: [PinsController],
  providers: [PinsService, PinsRepository],
  exports: [PinsService],
})
export class PinsModule {}
