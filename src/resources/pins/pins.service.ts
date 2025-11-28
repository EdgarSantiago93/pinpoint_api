import { Injectable } from '@nestjs/common';
import { FeedService } from '@pinpoint/resources/feed/feed.service';
import { PinsRepository } from '@pinpoint/resources/pins/pins.repository';
import { nearbyPinResponseSchema } from '@pinpoint/resources/pins/schemas/pins.schemas';
import {
  CreatePinInput,
  NearbyPinResponseType,
  PinSelectType,
} from '@pinpoint/resources/pins/types/pins.types';
import { VisitsService } from '@pinpoint/resources/visits/visits.service';
import { transformAndValidate } from '@pinpoint/utils/schema-transformer';

@Injectable()
export class PinsService {
  constructor(
    private readonly pinsRepository: PinsRepository,
    private readonly visitsService: VisitsService,
    private readonly feedService: FeedService,
  ) {}

  async countByUserId(userId: string): Promise<number> {
    return await this.pinsRepository.countByUserId(userId);
  }

  async checkIfPinExists(placeId: string): Promise<PinSelectType | undefined> {
    return await this.pinsRepository.checkIfPinExists(placeId);
  }

  ///
  async create(
    userId: string,
    createPinInput: CreatePinInput,
    // ): Promise<PinResponse> {PinSelectType
  ): Promise<any> {
    // console.log('1createPinInput', createPinInput);

    if (createPinInput.placeData?.placeId) {
      const pinExists = await this.checkIfPinExists(
        createPinInput.placeData.placeId,
      );
      if (pinExists) {
        return pinExists;
      }
    }

    const pin = await this.pinsRepository.createPin(userId, createPinInput);

    if (pin) {
      console.log('🟢🟢🟢🟢🟢🟢inserting visit', pin.id);
      await this.visitsService.create(userId, {
        pinId: pin.id,
        visitedAt: createPinInput.visitDate
          ? typeof createPinInput.visitDate === 'string'
            ? createPinInput.visitDate
            : createPinInput.visitDate.toISOString()
          : new Date().toISOString(),
      });

      console.log('🏈🏈🏈🏈🏈🏈inserting feed post', pin.id);
      await this.feedService.createFeedPost(pin);
    }
    return pin;
  }

  async findNearby(
    latitude: number,
    longitude: number,
    radius: number = 5000,
    limit: number = 50,
  ): Promise<NearbyPinResponseType[]> {
    const nearbyPins = await this.pinsRepository.findNearbyPins(
      latitude,
      longitude,
      radius,
      limit,
    );

    return nearbyPins.map((pin) =>
      transformAndValidate(nearbyPinResponseSchema, pin),
    );
  }

  async findOne(pinId: string) {
    return await this.pinsRepository.findById(pinId);
  }
}
