import { Dni } from '../value-objects/dni.value';
import { Person } from '../entities/participante.entity';
import { ParticipanteName } from '../value-objects/participante-name.value';

export class PersonFactory {
  public static createFrom(name: ParticipanteName, dni: Dni): Person {
    return new Person(name, dni);
  }
}