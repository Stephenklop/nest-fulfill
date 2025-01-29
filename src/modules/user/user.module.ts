// user.module.ts
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { UserService } from './user.service';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';
import { EventHandlers } from './events';
import { UserController } from './user.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UserSage } from './user.saga';
import { HashService } from './shared/utils/hash.service';

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [
    PrismaService,
    UserService,
    HashService,
    ...CommandHandlers,
    ...QueryHandlers,
    ...EventHandlers,
  ],
})
export class UserModule {}
