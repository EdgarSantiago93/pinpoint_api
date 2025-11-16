import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import {
  CreateCommentInput,
  UpdateCommentInput,
  CommentResponse,
} from './types/comments.types';

@Injectable()
export class CommentsService {
  constructor() {}

  // async create(
  //   userId: string,
  //   createCommentInput: CreateCommentInput,
  // ): Promise<CommentResponse> {
  //   return {
  //     id: '',
  //     content: '',
  //     pinId: '',
  //     userId: '',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     user: {
  //       id: '',
  //       username: '',
  //       name: '',
  //       avatar: '',
  //     },
  //   };
  // }

  // async findByPinId(pinId: string): Promise<CommentResponse[]> {
  //   return [];
  // }

  // async findOne(id: string): Promise<CommentResponse> {
  //   return {
  //     id: '',
  //     content: '',
  //     pinId: '',
  //     userId: '',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     user: {
  //       id: '',
  //       username: '',
  //       name: '',
  //       avatar: '',
  //     },
  //   };
  // }

  // async update(
  //   id: string,
  //   userId: string,
  //   updateCommentInput: UpdateCommentInput,
  // ): Promise<CommentResponse> {
  //   return {
  //     id: '',
  //     content: '',
  //     pinId: '',
  //     userId: '',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //     user: {
  //       id: '',
  //       username: '',
  //       name: '',
  //       avatar: '',
  //     },
  //   };
  // }

  // async remove(id: string, userId: string): Promise<void> {
  //   return;
  // }
}
