import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtPayload } from '../../auth/types/jwt-payload.type';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import {
  createCommentSchema,
  updateCommentSchema,
} from './schemas/comments.schemas';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createCommentSchema))
  create(@CurrentUser() user: JwtPayload, @Body() createCommentInput: any) {
    // return this.commentsService.create(user.userId, createCommentInput);
  }

  @Get('pin/:pinId')
  findByPinId(@Param('pinId') pinId: string) {
    // return this.commentsService.findByPinId(pinId);
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(updateCommentSchema))
  update(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Body() updateCommentInput: any,
  ) {
    // return this.commentsService.update(id, user.userId, updateCommentInput);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    // return this.commentsService.remove(id, user.userId);
  }
}
