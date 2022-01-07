import { AggregateRoot } from '@nestjs/cqrs';
import { ParticipanteId } from '../value-objects/participante-id.value';
import { Dni } from '../value-objects/dni.value';
import { ParticipanteName } from '../value-objects/participante-name.value';
import { ParticipantRegistered } from '../events/participant-registered.event';

export class Person extends AggregateRoot {
  protected id: ParticipanteId;
  private name: ParticipanteName;
  private dni: Dni;

  public constructor(name: ParticipanteName, dni: Dni) {
    super();
    this.name = name;
    this.dni = dni;
  }

  public changeId(id: ParticipanteId) {
    this.id = id;
  }

  public register() {
    const event = new ParticipantRegistered(this.id.getValue(), this.name.getFirstName(), this.name.getLastName(), this.dni.getValue());
    this.apply(event);
  }

  public getId(): ParticipanteId {
    return this.id;
  }

  public getName(): ParticipanteName {
    return this.name;
  }

  public getDni(): Dni {
    return this.dni;
  }

  public changeName(name: ParticipanteName): void {
    this.name = name;
  }

  public changeDni(dni: Dni): void {
    this.dni = dni;
  }
}