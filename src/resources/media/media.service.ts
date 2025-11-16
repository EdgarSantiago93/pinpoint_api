import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import { CreateMediaInput, MediaResponse } from './types/media.types';

@Injectable()
export class MediaService {
  constructor() {}

  // async create(
  //   userId: string,
  //   pinId: string,
  //   fileUrl: string,
  //   type: 'image' | 'video',
  // ): Promise<MediaResponse> {
  //   return {
  //     id: '',
  //     url: '',
  //     type: '',
  //     pinId: '',
  //     uploadedById: '',
  //     createdAt: new Date(),
  //     uploadedBy: {
  //       id: '',
  //       username: '',
  //       name: '',
  //     },
  //   };
  // }

  // async findByPinId(pinId: string): Promise<MediaResponse[]> {
  //   return [];
  // }

  // async findOne(id: string): Promise<MediaResponse> {
  //   return {
  //     id: '',
  //     url: '',
  //     type: '',
  //     pinId: '',
  //     uploadedById: '',
  //     createdAt: new Date(),
  //     uploadedBy: {
  //       id: '',
  //       username: '',
  //       name: '',
  //     },
  //   };
  // }
}
