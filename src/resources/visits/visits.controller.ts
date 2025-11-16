import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { VisitsService } from './visits.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtPayload } from '../../auth/types/jwt-payload.type';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { createVisitSchema } from './schemas/visits.schemas';

@Controller('visits')
@UseGuards(JwtAuthGuard)
export class VisitsController {
  constructor(private readonly visitsService: VisitsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createVisitSchema))
  create(@CurrentUser() user: JwtPayload, @Body() createVisitInput: any) {
    // return this.visitsService.create(user.userId, createVisitInput);
  }

  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    // return this.visitsService.findByUserId(userId);
  }

  @Get('pin/:pinId')
  findByPinId(@Param('pinId') pinId: string) {
    // return this.visitsService.findByPinId(pinId);
  }
}
