import { Injectable } from '@nestjs/common';
import { ICommand, IEvent, ofType, Saga } from '@nestjs/cqrs';
import { map, Observable } from 'rxjs';
import { UserRegisteredEvent } from './events/user-registered.event';

@Injectable()
export class UserSage {
  @Saga()
  userRegistered = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserRegisteredEvent),
      map((event: UserRegisteredEvent) => {
        console.log('test');
        return true;
      }),
    );
  };
}
