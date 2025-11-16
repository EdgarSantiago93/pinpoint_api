import { Inject, Injectable } from '@nestjs/common';
import * as schema from '@pinpoint/database/schema';
import { pins } from '@pinpoint/database/schema/pins';
import { eq } from 'drizzle-orm';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import { CreatePinInput, PinResponse } from './types/pins.types';

@Injectable()
export class PinsService {
  constructor(@Inject('DB') private db: LibSQLDatabase<typeof schema>) {}

  async create(
    userId: string,
    createPinInput: CreatePinInput,
  ): Promise<PinResponse> {
    // Store types as JSON string in url field (temporary)
    // TODO: Add dedicated fields for aspects, musts, and types in the schema
    const typesJson = createPinInput.types
      ? JSON.stringify(createPinInput.types)
      : null;

    // Store aspects and musts in category as JSON (temporary solution)
    // TODO: Add proper fields for aspects and musts
    const categoryWithMetadata =
      createPinInput.aspects || createPinInput.musts
        ? JSON.stringify({
            category: createPinInput.category || null,
            aspects: createPinInput.aspects || [],
            musts: createPinInput.musts || [],
          })
        : createPinInput.category || null;

    const [pin] = await this.db
      .insert(pins)
      .values({
        title: createPinInput.title,
        description: createPinInput.description || null,
        address: createPinInput.address || null,
        latitude: createPinInput.latitude || null,
        longitude: createPinInput.longitude || null,
        category: categoryWithMetadata,
        rating: createPinInput.rating || null,
        color: createPinInput.color || null,
        label: createPinInput.label || null, // Icon name
        url: typesJson, // Temporarily store types in url field
        createdById: userId,
      })
      .returning();

    // Fetch the created pin with user data
    const createdPin = await this.db.query.pins.findFirst({
      where: eq(pins.id, pin.id),
      with: {
        createdBy: true,
      },
    });

    if (!createdPin) {
      throw new Error('Failed to create pin');
    }

    // Get user data separately if not included in relation
    const user = createdPin.createdBy
      ? createdPin.createdBy
      : await this.db.query.users.findFirst({
          where: eq(schema.users.id, pin.createdById),
        });

    return {
      id: createdPin.id,
      title: createdPin.title,
      description: createdPin.description || undefined,
      address: createdPin.address || undefined,
      latitude: createdPin.latitude || undefined,
      longitude: createdPin.longitude || undefined,
      category: createdPin.category || undefined,
      rating: createdPin.rating || undefined,
      createdById: createdPin.createdById,
      createdAt: createdPin.createdAt,
      updatedAt: createdPin.updatedAt,
      createdBy: user
        ? {
            id: user.id,
            username: user.username,
            name: user.name || undefined,
            avatar: user.avatar || undefined,
          }
        : undefined,
      tags: [], // TODO: Implement tags relationship
    };
  }

  // findAll(_query: PinQueryInput): PinResponse[] {
  //   void _query;
  //   return [];
  // }

  // // findOne(_id: string): PinResponse {
  // findOne(_id: string): any {
  //   void _id;
  //   return {};
  // }

  // update(
  //   _id: string,
  //   _userId: string,
  //   _updatePinInput: UpdatePinInput,
  // ): PinResponse {
  //   void _id;
  //   void _userId;
  //   void _updatePinInput;
  //   return {
  //     id: '',
  //     title: '',
  //     description: '',
  //     address: '',
  //     latitude: 0,
  //     longitude: 0,
  //     category: '',
  //     rating: 0,
  //     createdById: '',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     createdBy: {
  //       id: '',
  //       username: '',
  //       name: '',
  //       avatar: '',
  //     },
  //     tags: [],
  //   };
  // }

  // remove(_id: string, _userId: string): void {
  //   void _id;
  //   void _userId;
  //   return;
  // }

  // search(_searchTerm: string, _query: PinQueryInput): PinResponse[] {
  //   void _searchTerm;
  //   void _query;
  //   return [];
  // }
}
