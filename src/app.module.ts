import { CanActivate, Module, Type } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '@pinpoint/auth/auth.module';
import { ConfigModule } from '@pinpoint/config/config.module';
import { PinsModule } from '@pinpoint/resources/pins/pins.module';

import { EventEmitterModule } from '@nestjs/event-emitter';
import { JwtAuthGuard } from '@pinpoint/auth/guards/jwt-auth.guard';
import { HealthController } from '@pinpoint/health/health.controller';
import { FeedModule } from '@pinpoint/resources/feed/feed.module';
import { DrizzleTursoModuleForRoot } from '@pinpoint/utils/modules';

@Module({
  controllers: [HealthController],
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule,
    DrizzleTursoModuleForRoot,
    AuthModule,
    PinsModule,
    FeedModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard as Type<CanActivate>,
    },
  ],
})
export class AppModule {}
