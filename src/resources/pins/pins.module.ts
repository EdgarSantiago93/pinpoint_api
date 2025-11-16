import { Module } from '@nestjs/common';
import { PinsService } from './pins.service';
import { PinsController } from './pins.controller';

@Module({
  imports: [],
  controllers: [PinsController],
  providers: [PinsService],
  exports: [PinsService],
})
export class PinsModule {}
