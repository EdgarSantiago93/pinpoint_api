import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from '@pinpoint/database/schema';
import { users } from '@pinpoint/database/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('DB') private db: LibSQLDatabase<typeof schema>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'your-secret-key',
    });
  }

  async validate(payload: any) {
    if (!payload.sub) {
      throw new UnauthorizedException();
    }

    const [user] = await this.db
      .select({ status: users.status, isDeleted: users.isDeleted })
      .from(users)
      .where(eq(users.id, payload.sub))
      .limit(1);

    if (!user || user.status !== 'active' || user.isDeleted !== 0) {
      throw new UnauthorizedException();
    }

    return { userId: payload.sub, email: payload.email };
  }
}
