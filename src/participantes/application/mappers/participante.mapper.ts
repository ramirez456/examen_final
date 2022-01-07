import { ParticipanteTypeORM } from '../../infrastructure/persistence/typeorm/entities/participante.typeorm';
import { Person } from '../../domain/entities/participante.entity';
import { PersonNameTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/participante-name.typeorm';
import { DniTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/dni.typeorm';

export class ParticipanteMapper {
  public static toTypeORM(person: Person): ParticipanteTypeORM {
    const personTypeORM: ParticipanteTypeORM = new ParticipanteTypeORM();
    personTypeORM.name = PersonNameTypeORM.from(person.getName().getFirstName(), person.getName().getLastName());
    personTypeORM.dni = DniTypeORM.from(person.getDni().getValue());
    const createdAt: string = null;
    const createdBy: number = null;
    const updatedAt: string = null;
    const updatedBy: number = null;
    return personTypeORM;
  }
}