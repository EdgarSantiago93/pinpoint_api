import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import * as schema from '@pinpoint/database/schema';
import { pins } from '@pinpoint/database/schema';
import {
  CreatePinInput,
  PinSelectType,
} from '@pinpoint/resources/pins/types/pins.types';
import { and, count, eq, gte, inArray, lte, sql } from 'drizzle-orm';
import { LibSQLDatabase } from 'drizzle-orm/libsql';

@Injectable()
export class PinsRepository {
  constructor(
    @Inject('DB') private db: LibSQLDatabase<typeof schema>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async countByUserId(userId: string): Promise<number> {
    const [result] = await this.db
      .select({ count: count() })
      .from(pins)
      .where(and(eq(pins.createdById, userId), eq(pins.isDeleted, 0)));
    return result?.count ?? 0;
  }

  async checkIfPinExists(placeId: string): Promise<PinSelectType | undefined> {
    return await this.db.query.pins.findFirst({
      where: and(eq(pins.placeId, placeId)),
    });
  }

  async createPin(
    userId: string,
    createPinInput: CreatePinInput,
  ): Promise<PinSelectType | undefined> {
    console.log('createPin', userId, createPinInput);

    const [pin] = await this.db
      .insert(pins)
      .values({
        title: createPinInput.placeData?.name ?? '',
        description: createPinInput.description ?? '',
        address: createPinInput.placeData?.address ?? '',
        latitude: createPinInput.placeData?.latitude ?? 0,
        longitude: createPinInput.placeData?.longitude ?? 0,
        locationMetadata: {
          country: createPinInput.placeData?.country ?? '',
          city: createPinInput.placeData?.city ?? '',
          neighborhood: createPinInput.placeData?.neighborhood ?? '',
        },
        category: 'restaurant',
        rating: createPinInput.rating ?? 0,
        color: createPinInput.selectedColor ?? '',
        icon: createPinInput.selectedIcon ?? 'Store',
        url: '',
        aspects:
          createPinInput.aspects && createPinInput.aspects.length > 0
            ? createPinInput.aspects
            : ['food_quality', 'service', 'atmosphere', 'cleanliness', 'value'],
        placeId: createPinInput.placeData?.placeId ?? '',
        createdById: userId,
      })
      .returning();
    if (!pin) {
      throw new Error('Failed to create pin');
    }

    await this.insertTags(pin.id, createPinInput.placeData?.types ?? []);
    await this.insertMustKnows({
      pinId: pin.id,
      musts: createPinInput.musts ?? [],
      userId,
    });

    return pin;
  }

  async insertTags(pinId: string, tags: string[]): Promise<void> {
    if (!tags || tags.length === 0) return;

    const tagPayload = tags.map((tag) => ({
      key: tag,
      value: tag,
    }));

    // Insert tags (new ones will be inserted, existing ones will be ignored)
    await this.db.insert(schema.tags).values(tagPayload).onConflictDoNothing();

    // Query to get ALL tag IDs by their keys
    const allTagRecords = await this.db
      .select({
        id: schema.tags.id,
        key: schema.tags.key,
      })
      .from(schema.tags)
      .where(inArray(schema.tags.key, tags));

    // Create pinTags relationships
    if (allTagRecords.length > 0) {
      const pinTagPayload = allTagRecords.map((tag) => ({
        pinId,
        tagId: tag.id,
      }));

      await this.db
        .insert(schema.pinTags)
        .values(pinTagPayload)
        .onConflictDoNothing();
    }
  }

  async insertMustKnows({
    pinId,
    musts,
    userId,
  }: {
    pinId: string;
    musts: string[];
    userId: string;
  }): Promise<void> {
    if (!musts || musts.length === 0) return;

    const mustPayload = musts.map((must) => ({
      content: must,
      pinId,
      createdById: userId,
    }));

    const [mustKnows] = await this.db
      .insert(schema.mustKnows)
      .values(mustPayload)
      .onConflictDoNothing()
      .returning();
    console.log('🚀 Inserted must knows', mustKnows);

    if (!mustKnows) {
      throw new Error('Failed to create must knows');
    }
  }

  /**
   * Find nearby pins within a radius (in meters) from given coordinates
   * Uses Haversine formula for distance calculation
   */
  async findNearbyPins(
    latitude: number,
    longitude: number,
    radius: number = 5000,
    limit: number = 50,
  ): Promise<PinSelectType[]> {
    // Earth's radius in meters
    const earthRadius = 6371000;

    // Calculate bounding box for initial filtering (more efficient)
    // 1 degree latitude ≈ 111km, so we add a buffer
    const latDelta = radius / 111000;
    const lonDelta = radius / (111000 * Math.cos((latitude * Math.PI) / 180));

    // First, get pins within bounding box (fast filtering)
    const boundingBoxPins = await this.db
      .select()
      .from(pins)
      .where(
        and(
          eq(pins.isDeleted, 0),
          gte(pins.latitude, latitude - latDelta),
          lte(pins.latitude, latitude + latDelta),
          gte(pins.longitude, longitude - lonDelta),
          lte(pins.longitude, longitude + lonDelta),
          sql`${pins.latitude} IS NOT NULL`,
          sql`${pins.longitude} IS NOT NULL`,
        ),
      )
      .limit(limit * 2); // Get more than needed for distance filtering

    // Calculate distance using Haversine formula and filter by radius
    const pinsWithDistance = boundingBoxPins
      .map((pin) => {
        if (!pin.latitude || !pin.longitude) return null;

        // Haversine formula
        const dLat = ((pin.latitude - latitude) * Math.PI) / 180;
        const dLon = ((pin.longitude - longitude) * Math.PI) / 180;
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos((latitude * Math.PI) / 180) *
            Math.cos((pin.latitude * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;

        return {
          pin,
          distance,
        };
      })
      .filter((item) => item !== null && item.distance <= radius)
      .sort((a, b) => a!.distance - b!.distance)
      .slice(0, limit);

    return pinsWithDistance.map((item) => item!.pin);
  }

  async findById(pinId: string) {
    const pin = await this.db.query.pins.findFirst({
      where: and(eq(pins.id, pinId), eq(pins.isDeleted, 0)),
    });

    if (!pin) return null;

    // Get created by user
    const createdBy = await this.db.query.users.findFirst({
      where: eq(schema.users.id, pin.createdById),
      columns: {
        id: true,
        username: true,
        name: true,
        avatar: true,
      },
    });

    // Get tags
    const pinTagsRecords = await this.db
      .select()
      .from(schema.pinTags)
      .where(eq(schema.pinTags.pinId, pinId));

    const tagIds = pinTagsRecords.map((pt) => pt.tagId);
    const tags =
      tagIds.length > 0
        ? await this.db
            .select()
            .from(schema.tags)
            .where(inArray(schema.tags.id, tagIds))
        : [];

    // Get must knows
    const mustKnows = await this.db
      .select()
      .from(schema.mustKnows)
      .where(
        and(
          eq(schema.mustKnows.pinId, pinId),
          eq(schema.mustKnows.isDeleted, 0),
        ),
      );

    // Get visits count
    const visits = await this.db
      .select({ count: count() })
      .from(schema.pinVisits)
      .where(eq(schema.pinVisits.pinId, pinId));

    return {
      ...pin,
      createdBy,
      tags: tags.map((tag) => ({
        id: tag.id,
        key: tag.key,
        value: tag.value,
      })),
      mustKnows,
      visitCount: visits[0]?.count ?? 0,
    };
  }
}
