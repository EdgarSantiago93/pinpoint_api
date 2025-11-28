import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from '@pinpoint/auth/auth.repository';
import { userResponseSchema } from '@pinpoint/auth/schemas/auth.schemas';
import {
  CreateUserInput,
  LoginInput,
  UserResponse,
} from '@pinpoint/auth/types/auth.types';
import { PinsService } from '@pinpoint/resources/pins/pins.service';
import { transformAndValidate } from '@pinpoint/utils/schema-transformer';
import * as argon2 from 'argon2';
import { z } from 'zod';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly pinsService: PinsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateEmail(
    email: string,
  ): Promise<{ ok: boolean; action?: string }> {
    try {
      const existingUser = await this.authRepository.getUserByEmail(email);
      console.log('i set up the whole night', existingUser);
      if (existingUser && existingUser.status === 'inactive') {
        return {
          ok: false,
          action: 'user_inactive_or_deleted',
        };
      }
      if (
        existingUser &&
        existingUser.status === 'active' &&
        existingUser.isDeleted === 0
      ) {
        return {
          ok: true,
          action: 'user_ok',
        };
      }

      return {
        ok: false,
        action: 'email_not_found',
      };
    } catch (error) {
      console.log('error', error);
      throw new BadRequestException('email_validation_failed');
    }
  }
  async register(createUserInput: CreateUserInput): Promise<{
    user: UserResponse;
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const existingUser = await this.authRepository.getUserByEmail(
        createUserInput.email,
      );
      if (existingUser) {
        throw new ConflictException('User_already_exists');
      }

      const newUser = await this.authRepository.insertUser(createUserInput);
      console.log('newUser', newUser);
      if (!newUser) {
        throw new BadRequestException('User_registration_failed_to_insert');
      }

      const tokenPayload = {
        sub: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role ?? 'USER',
      };

      const accessToken = await this.jwtService.signAsync(tokenPayload, {
        expiresIn: '15m',
      });
      const refreshToken = await this.jwtService.signAsync(tokenPayload, {
        expiresIn: '7d',
      });

      const userResponse = transformAndValidate(userResponseSchema, newUser);
      return { user: userResponse, accessToken, refreshToken };
    } catch (error) {
      console.log('error', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw new UnauthorizedException('user_registration_failed');
    }
  }

  async login(loginInput: LoginInput): Promise<{
    user: UserResponse;
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      const user = await this.authRepository.getUserByEmail(loginInput.email);
      if (!user) {
        throw new UnauthorizedException('invalid_credentials');
      }
      const isPasswordValid = await argon2.verify(
        user.password,
        loginInput.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('invalid_credentials');
      }
      const tokenPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role ?? 'USER',
      };
      const accessToken = await this.jwtService.signAsync(tokenPayload, {
        expiresIn: '15m',
      });
      const refreshToken = await this.jwtService.signAsync(tokenPayload, {
        expiresIn: '7d',
      });
      const userResponse = transformAndValidate(userResponseSchema, user);
      return { user: userResponse, accessToken, refreshToken };
    } catch (error) {
      console.log('error', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException('user_login_failed');
    }
  }

  async me(
    userId: string,
    options?: {
      includePins?: boolean;
      includeCollections?: boolean;
      includeVisitCount?: boolean;
      includeWishlistCount?: boolean;
    },
  ): Promise<UserResponse> {
    try {
      const user = await this.authRepository.getUserById(userId);
      if (!user) {
        throw new UnauthorizedException('user_not_found');
      }

      const userResponse = transformAndValidate(
        userResponseSchema.extend({
          status: z.string(),
          updatedAt: z.date(),
          role: z.string(),
        }),
        user,
      );

      // TODO: Implement fetching of pins, collections, visitCount, wishlistCount
      // based on the options parameter
      if (options?.includePins) {
        // Fetch pins for the user
        const pinsCount = await this.pinsService.countByUserId(userId);
        userResponse.pins = pinsCount;
      }

      if (options?.includeCollections) {
        // Fetch collections for the user
        // const collections = await this.collectionsRepository.findByUserId(userId);
        // userResponse.collections = collections;
        userResponse.collections = 5;
      }

      if (options?.includeVisitCount) {
        // Fetch visit count for the user
        // const visitCount = await this.visitsRepository.countByUserId(userId);
        // userResponse.visitCount = visitCount;
        userResponse.visitCount = 10;
      }

      if (options?.includeWishlistCount) {
        // Fetch wishlist count for the user
        // const wishlistCount = await this.wishlistRepository.countByUserId(userId);
        // userResponse.wishlistCount = wishlistCount;
        userResponse.wishlistCount = 20;
      }

      return userResponse;
    } catch (error) {
      console.log('error', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new BadRequestException('user_me_failed');
    }
  }

  async refreshToken(refreshToken: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    try {
      // Verify the refresh token
      const payload = await this.jwtService.verifyAsync(refreshToken);
      if (!payload || !payload.sub) {
        throw new UnauthorizedException('invalid_refresh_token');
      }

      // Get user to ensure they still exist and are active
      const user = await this.authRepository.getUserById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('user_not_found');
      }

      // Generate new tokens
      const tokenPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role ?? 'USER',
      };

      const newAccessToken = await this.jwtService.signAsync(tokenPayload, {
        expiresIn: '15m',
      });
      const newRefreshToken = await this.jwtService.signAsync(tokenPayload, {
        expiresIn: '7d',
      });

      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      };
    } catch (error) {
      console.log('refresh token error', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('invalid_refresh_token');
    }
  }

  // async updateProfile(
  //   userId: string,
  //   updateUserInput: UpdateUserInput,
  // ): Promise<UserResponse> {
  //   return {
  //     id: '',
  //     email: '',
  //     username: '',
  //     name: '',
  //     avatar: '',
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   };
  // }
}
