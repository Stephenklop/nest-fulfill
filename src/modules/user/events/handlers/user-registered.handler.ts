import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserRegisteredEvent } from '../user-registered.event';

@EventsHandler(UserRegisteredEvent)
export class UserRegisteredHandler
  implements IEventHandler<UserRegisteredEvent>
{
  handle(event: UserRegisteredEvent) {
    console.log(`UserRegisteredEvent triggered: Email = ${event.email}`);
  }
}
