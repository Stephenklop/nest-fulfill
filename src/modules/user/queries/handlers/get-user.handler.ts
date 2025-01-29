import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../get-user.query';
import { UserService } from '../../user.service';
import { User } from '@prisma/client';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(private readonly userService: UserService) {}

  async execute(query: GetUserQuery): Promise<User | null> {
    const { userId } = query;
    return this.userService.findById(userId);
  }
}
