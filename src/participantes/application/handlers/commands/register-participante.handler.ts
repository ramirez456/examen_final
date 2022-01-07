import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonFactory } from '../../../domain/factories/participante.factory';
import { ParticipanteId } from '../../../domain/value-objects/participante-id.value';
import { Dni } from '../../../domain/value-objects/dni.value';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../eventos/application/app.notification';
import { ParticipanteName } from '../../../domain/value-objects/participante-name.value';
import { RegisterParticipante } from '../../commands/register-participante.command';
import { Person } from '../../../domain/entities/participante.entity';
import { ParticipanteMapper } from '../../mappers/participante.mapper';
import { ParticipanteTypeORM } from '../../../infrastructure/persistence/typeorm/entities/participante.typeorm';
import { DateTime } from '../../../../eventos/domain/value-objects/date-time.value';
//import { UserId } from '../../../../users/domain/value-objects/user-id.value';

@CommandHandler(RegisterParticipante)
export class RegisterPersonHandler
  implements ICommandHandler<RegisterParticipante> {
  constructor(
    @InjectRepository(ParticipanteTypeORM)
    private personRepository: Repository<ParticipanteTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: RegisterParticipante) {
    let customerId: number = 0;
    const personNameResult: Result<AppNotification, ParticipanteName> = ParticipanteName.create(command.firstName, command.lastName);
    if (personNameResult.isFailure()) {
      return customerId;
    }
    const dniResult: Result<AppNotification, Dni> = Dni.create(command.dni);
    if (dniResult.isFailure()) {
      return customerId;
    }
    
    let person: Person = PersonFactory.createFrom(personNameResult.value, dniResult.value);
    let personTypeORM: ParticipanteTypeORM = ParticipanteMapper.toTypeORM(person);
    personTypeORM = await this.personRepository.save(personTypeORM);
    if (personTypeORM == null) {
      return customerId;
    }
    customerId = Number(personTypeORM.id);
    person.changeId(ParticipanteId.of(customerId));
    person = this.publisher.mergeObjectContext(person);
    person.register();
    person.commit();
    return customerId;
  }
}