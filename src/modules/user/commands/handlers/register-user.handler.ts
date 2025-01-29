import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { User } from '@prisma/client';

import { RegisterUserCommand } from '../register-user.command';
import { UserService } from '../../user.service';
import { UserRegisteredEvent } from '../../events/user-registered.event';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
  implements ICommandHandler<RegisterUserCommand>
{
  constructor(
    private readonly userService: UserService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: RegisterUserCommand): Promise<User> {
    const { email, password, firstName, lastName } = command;

    // Create the new user
    const newUser = await this.userService.createUser(
      email,
      password,
      firstName,
      lastName,
    );

    // Publish a domain event after successful registration
    this.eventBus.publish(new UserRegisteredEvent(newUser.id, newUser.email));

    return newUser;
  }
}
