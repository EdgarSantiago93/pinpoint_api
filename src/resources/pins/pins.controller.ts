import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { JwtPayload } from '../../auth/types/jwt-payload.type';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { PinsService } from './pins.service';
import {
  createPinSchema,
  pinQuerySchema,
  updatePinSchema,
} from './schemas/pins.schemas';
import { PinResponse } from './types/pins.types';

@Controller('pins')
@UseGuards(JwtAuthGuard)
export class PinsController {
  constructor(private readonly pinsService: PinsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPinSchema))
  async create(
    @CurrentUser() user: JwtPayload,
    @Body() createPinInput: any,
  ): Promise<PinResponse> {
    return this.pinsService.create(user.userId, createPinInput);
  }

  @Get()
  @UsePipes(new ZodValidationPipe(pinQuerySchema.partial()))
  findAll(@Query() query: any) {
    // return this.pinsService.findAll(query);
  }

  @Get('search')
  @UsePipes(new ZodValidationPipe(pinQuerySchema.partial()))
  search(@Query('q') searchTerm: string, @Query() query: any) {
    if (!searchTerm || searchTerm.trim().length === 0) {
      return [];
    }
    // return this.pinsService.search(searchTerm, query);
  }

  @Get(':id')
  // findOne(@Param('id') id: string): Promise<PinResponse> {
  async findOne(@Param('id') id: string): Promise<any> {
    await Promise.resolve();
    return '';
    // return this.pinsService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ZodValidationPipe(updatePinSchema))
  update(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Body() updatePinInput: any,
  ) {
    // return this.pinsService.update(id, user.userId, updatePinInput);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    // return this.pinsService.remove(id, user.userId);
  }
}
