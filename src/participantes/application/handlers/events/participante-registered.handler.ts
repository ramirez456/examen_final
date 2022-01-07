import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { ParticipantRegistered as ParticipanteRegistered } from '../../../domain/events/participant-registered.event';

@EventsHandler(ParticipanteRegistered)
export class PersonRegisteredHandler implements IEventHandler<ParticipanteRegistered> {
  constructor() {}

  handle(event: ParticipanteRegistered) {
    console.log('handle logic for ParticipantRegistered');
    console.log(event);
  }
}