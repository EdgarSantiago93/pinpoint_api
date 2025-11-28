import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { CurrentUser } from '@pinpoint/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '@pinpoint/auth/guards/jwt-auth.guard';
import { JwtPayload } from '@pinpoint/auth/types/jwt-payload.type';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { Public } from './decorators/public.decorator';
import {
  createUserSchema,
  loginSchema,
  meQuerySchema,
  refreshTokenSchema,
  validateEmailSchema,
} from './schemas/auth.schemas';
import {
  CreateUserInput,
  LoginInput,
  MeQueryInput,
  ValidateEmailInput,
} from './types/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('validate-email')
  async validateEmail(
    @Body(new ZodValidationPipe(validateEmailSchema))
    validateEmailInput: ValidateEmailInput,
  ) {
    console.log('validateEmailInput', validateEmailInput);
    return await this.authService.validateEmail(validateEmailInput.email);
  }

  @Public()
  @Post('register')
  async register(
    @Body(new ZodValidationPipe(createUserSchema))
    createUserInput: CreateUserInput,
  ) {
    console.log('createUserInput', createUserInput);
    return await this.authService.register(createUserInput);
  }

  @Public()
  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }

  @Public()
  @Post('refresh')
  @UsePipes(new ZodValidationPipe(refreshTokenSchema))
  async refresh(@Body() body: { refreshToken: string }) {
    return await this.authService.refreshToken(body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(
    @CurrentUser() user: JwtPayload,
    @Query(new ZodValidationPipe(meQuerySchema.partial())) query: MeQueryInput,
  ) {
    return await this.authService.me(user.userId, {
      includePins: query.pins,
      includeCollections: query.collections,
      includeVisitCount: query.visitCount,
      includeWishlistCount: query.wishlistCount,
    });
  }

  // Test endpoint to simulate invalid token - returns 401
  // Remove this in production

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // async getProfileAlt(@CurrentUser() user: JwtPayload): Promise<UserResponse> {
  //   const userProfile = await this.authService.findById(user.userId);
  //   if (!userProfile) {
  //     throw new Error('User not found');
  //   }
  //   return userProfile;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Put('profile')
  // @UsePipes(new ZodValidationPipe(updateUserSchema))
  // async updateProfile(
  //   @CurrentUser() user: JwtPayload,
  //   @Body() updateUserInput: any,
  // ): Promise<UserResponse> {
  //   return this.authService.updateProfile(user.userId, updateUserInput);
  // }
}
