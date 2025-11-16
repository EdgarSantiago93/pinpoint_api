import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import { CreateTagInput, TagResponse } from './types/tags.types';

@Injectable()
export class TagsService {
  constructor() {}

  // async create(createTagInput: CreateTagInput): Promise<TagResponse> {
  //   return {
  //     id: '',
  //     name: '',
  //     color: '',
  //     createdAt: new Date(),
  //     pinCount: 0,
  //   };
  // }

  // async findAll(): Promise<TagResponse[]> {
  //   return [];
  // }

  // async findPopular(limit: number = 10): Promise<TagResponse[]> {
  //   return [];
  // }

  // async findOne(id: string): Promise<TagResponse> {
  //   return {
  //     id: '',
  //     name: '',
  //     color: '',
  //     createdAt: new Date(),
  //     pinCount: 0,
  //   };
  // }
}
