import { Module } from '@nestjs/common';
import { VisitsRepository } from '@pinpoint/resources/visits/visits.repository';
import { VisitsController } from './visits.controller';
import { VisitsService } from './visits.service';

@Module({
  imports: [],
  controllers: [VisitsController],
  providers: [VisitsService, VisitsRepository],
  exports: [VisitsService],
})
export class VisitsModule {}
