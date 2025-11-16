import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtPayload } from '../../auth/types/jwt-payload.type';

@Controller('likes')
@UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('pin/:pinId')
  toggleLike(@Param('pinId') pinId: string, @CurrentUser() user: JwtPayload) {
    // return this.likesService.toggleLike(pinId, user.userId);
  }

  @Get('pin/:pinId/count')
  getLikeCount(@Param('pinId') pinId: string) {
    // return this.likesService.getLikeCount(pinId).then((count) => ({ count }));
  }
}
