import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Body,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtPayload } from '../../auth/types/jwt-payload.type';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { createMediaSchema } from './schemas/media.schemas';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { randomUUID } from 'crypto';

@Controller('media')
@UseGuards(JwtAuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = randomUUID();
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  @UsePipes(new ZodValidationPipe(createMediaSchema))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() createMediaInput: any,
    @CurrentUser() user: JwtPayload,
  ) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    // In production, upload to cloud storage (S3, Cloudinary, etc.)
    // For now, we'll use a local file path
    const fileUrl = `/uploads/${file.filename}`;

    const validated = createMediaInput as {
      pinId: string;
      type: 'image' | 'video';
    };
    // return this.mediaService.create(
    //   user.userId,
    //   validated.pinId,
    //   fileUrl,
    //   validated.type,
    // );
  }

  @Get('pin/:pinId')
  async findByPinId(@Param('pinId') pinId: string) {
    // return this.mediaService.findByPinId(pinId);
  }
}
