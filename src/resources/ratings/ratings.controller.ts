import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtPayload } from '../../auth/types/jwt-payload.type';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { createRatingSchema } from './schemas/ratings.schemas';

@Controller('ratings')
@UseGuards(JwtAuthGuard)
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Post('pin/:pinId')
  @UsePipes(new ZodValidationPipe(createRatingSchema))
  create(
    @Param('pinId') pinId: string,
    @CurrentUser() user: JwtPayload,
    @Body() createRatingInput: any,
  ) {
    // return this.ratingsService.createOrUpdate(
    //   pinId,
    //   user.userId,
    //   createRatingInput,
    // );
  }

  @Put('pin/:pinId')
  @UsePipes(new ZodValidationPipe(createRatingSchema))
  update(
    @Param('pinId') pinId: string,
    @CurrentUser() user: JwtPayload,
    @Body() createRatingInput: any,
  ) {
    // return this.ratingsService.createOrUpdate(
    //   pinId,
    //   user.userId,
    //   createRatingInput,
    // );
  }

  @Get('pin/:pinId/average')
  getAverageRating(@Param('pinId') pinId: string) {
    // return this.ratingsService.getAverageRating(pinId);
  }
}
