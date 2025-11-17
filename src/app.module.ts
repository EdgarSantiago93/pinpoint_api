import { CanActivate, Module, Type } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '@pinpoint/auth/auth.module';
import { ConfigModule } from '@pinpoint/config/config.module';
import { PinsModule } from '@pinpoint/resources/pins/pins.module';
// import { MediaModule } from '@pinpoint/resources/media/media.module';
// import { CommentsModule } from '@pinpoint/resources/comments/comments.module';
// import { VisitsModule } from '@pinpoint/resources/visits/visits.module';
// import { FeedModule } from '@pinpoint/resources/feed/feed.module';
// import { TagsModule } from '@pinpoint/resources/tags/tags.module';
// import { LikesModule } from '@pinpoint/resources/likes/likes.module';
// import { RatingsModule } from '@pinpoint/resources/ratings/ratings.module';
import { JwtAuthGuard } from '@pinpoint/auth/guards/jwt-auth.guard';
import { HealthController } from '@pinpoint/health/health.controller';
import { DrizzleTursoModuleForRoot } from '@pinpoint/utils/modules';

@Module({
  controllers: [HealthController],
  imports: [
    ConfigModule,
    DrizzleTursoModuleForRoot,
    // DatabaseModule,
    AuthModule,
    PinsModule,
    // MediaModule,
    // CommentsModule,
    // VisitsModule,
    // FeedModule,
    // TagsModule,
    // LikesModule,
    // RatingsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard as Type<CanActivate>,
    },
  ],
})
export class AppModule {}
