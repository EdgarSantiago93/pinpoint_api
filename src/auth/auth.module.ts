import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthRepository } from '@pinpoint/auth/auth.repository';
import { PinsModule } from '@pinpoint/resources/pins/pins.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-secret-key',
        signOptions: { expiresIn: '7d' },
      }),
    }),
    PinsModule,
  ],
  controllers: [AuthController],
  // providers: [AuthService, JwtStrategy, AuthService],
  providers: [AuthService, JwtStrategy, AuthService, AuthRepository],
  exports: [AuthService],
})
export class AuthModule {}
