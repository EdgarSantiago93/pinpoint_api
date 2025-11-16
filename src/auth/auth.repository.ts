import { Inject, Injectable } from '@nestjs/common';
import { LibSQLDatabase } from 'drizzle-orm/libsql';
import * as schema from '@pinpoint/database/schema';
import { users } from '@pinpoint/database/schema';
import { CreateUserInput, type UserSelectType } from '../auth/types/auth.types';
import * as argon2 from 'argon2';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class AuthRepository {
  constructor(@Inject('DB') private db: LibSQLDatabase<typeof schema>) {}

  async insertUser(userPayload: CreateUserInput) {
    console.log('insertUser', userPayload);
    const [user] = await this.db
      .insert(users)
      .values({
        name: userPayload.name ?? 'user_name',
        email: userPayload.email,
        username: userPayload.username,
        password: await argon2.hash(userPayload.password),
      })
      .returning();
    console.log('user', user);
    return user;
  }

  async getUserByEmail(email: string): Promise<UserSelectType | undefined> {
    return await this.db.query.users.findFirst({
      where: and(
        eq(users.email, email),
        eq(users.status, 'active'),
        eq(users.isDeleted, 0),
      ),
    });
  }

  async getUserById(userId: string): Promise<UserSelectType | undefined> {
    return await this.db.query.users.findFirst({
      where: and(
        eq(users.id, userId),
        eq(users.status, 'active'),
        eq(users.isDeleted, 0),
      ),
    });
  }
}
