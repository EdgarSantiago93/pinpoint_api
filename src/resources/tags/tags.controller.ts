import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  UsePipes,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import {
  createTagSchema,
  popularTagsQuerySchema,
} from './schemas/tags.schemas';

@Controller('tags')
@UseGuards(JwtAuthGuard)
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll() {
    // return this.tagsService.findAll();
  }

  @Get('popular')
  @UsePipes(new ZodValidationPipe(popularTagsQuerySchema.partial()))
  findPopular(@Query() query: any) {
    const limit = (query as { limit?: number }).limit || 10;
    // return this.tagsService.findPopular(limit);
  }

  @Post()
  @UsePipes(new ZodValidationPipe(createTagSchema))
  create(@Body() createTagInput: any) {
    // return this.tagsService.create(
    //   createTagInput as { name: string; color?: string },
    // );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    // return this.tagsService.findOne(id);
  }
}
