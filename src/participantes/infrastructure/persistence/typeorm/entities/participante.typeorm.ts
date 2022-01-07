import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { DniTypeORM } from '../value-objects/dni.typeorm';
import { PersonNameTypeORM } from '../value-objects/participante-name.typeorm';

@Entity('participantes')//como se llama mi tabla
@Unique('UQ_participante_dni', ['dni.value'])//crea una llave unica para el dni
export class ParticipanteTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => PersonNameTypeORM, { prefix: false })
  public name: PersonNameTypeORM;

  @Column((type) => DniTypeORM, { prefix: false })
  public dni: DniTypeORM;
  
}