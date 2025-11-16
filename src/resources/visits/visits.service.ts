import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import { CreateVisitInput, VisitResponse } from './types/visits.types';

@Injectable()
export class VisitsService {
  constructor() {}

  // async create(
  //   userId: string,
  //   createVisitInput: CreateVisitInput,
  // ): Promise<VisitResponse> {
  //   return {
  //     id: '',
  //     pinId: '',
  //     userId: '',
  //     visitedAt: new Date(),
  //     notes: '',
  //     createdAt: new Date(),
  //     pin: {
  //       id: '',
  //       title: '',
  //       address: '',
  //     },
  //     user: {
  //       id: '',
  //       username: '',
  //       name: '',
  //     },
  //   };
  // }

  // async findByUserId(userId: string): Promise<VisitResponse[]> {
  //   return [];
  // }

  // async findByPinId(pinId: string): Promise<VisitResponse[]> {
  //   return [];
  // }

  // async findOne(id: string): Promise<VisitResponse> {
  //   return {
  //     id: '',
  //     pinId: '',
  //     userId: '',
  //     visitedAt: new Date(),
  //     notes: '',
  //     createdAt: new Date(),
  //     pin: {
  //       id: '',
  //       title: '',
  //       address: '',
  //     },
  //     user: {
  //       id: '',
  //       username: '',
  //       name: '',
  //     },
  //   };
  // }
}
