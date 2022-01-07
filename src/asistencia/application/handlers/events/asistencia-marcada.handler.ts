import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { AsistenciaMarcada } from '../../../domain/events/asistencia-marcada.event';

@EventsHandler(AsistenciaMarcada)
export class AccountOpenedHandler implements IEventHandler<AsistenciaMarcada> {
  constructor() {}

  handle(event: AsistenciaMarcada) {
    console.log('handle logic for AccountOpened');
    console.log(event);
  }
}