import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { JwtPayload } from '../../auth/types/jwt-payload.type';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { PinsService } from './pins.service';
import { createPinSchema, nearbyPinsQuerySchema } from './schemas/pins.schemas';
import {
  CreatePinInput,
  NearbyPinResponseType,
  PinResponse,
} from './types/pins.types';

@Controller('pins')
@UseGuards(JwtAuthGuard)
export class PinsController {
  constructor(private readonly pinsService: PinsService) {}

  @Post()
  // @UsePipes(new ZodValidationPipe(createPinSchema))
  async create(
    @CurrentUser() user: JwtPayload,
    @Body(new ZodValidationPipe(createPinSchema))
    createPinInput: CreatePinInput,
  ): Promise<PinResponse> {
    console.log('user', user);
    console.log('createPinInput', createPinInput);
    return this.pinsService.create(user.userId, createPinInput);
  }

  @Get('nearby')
  async findNearby(
    @Query(new ZodValidationPipe(nearbyPinsQuerySchema))
    query: {
      latitude: number;
      longitude: number;
      radius?: number;
      limit?: number;
    },
  ): Promise<NearbyPinResponseType[]> {
    const nearbyPins = await this.pinsService.findNearby(
      query.latitude,
      query.longitude,
      query.radius,
      query.limit,
    );
    return nearbyPins;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.pinsService.findOne(id);
  }
}
