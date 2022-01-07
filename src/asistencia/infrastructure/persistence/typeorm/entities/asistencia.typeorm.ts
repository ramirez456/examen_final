import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { AccountNumberTypeORM } from '../value-objects/account-number.typeorm';
import { AsistenciaIdTypeORM } from '../value-objects/asistencia-id.typeorm';
//import { BalanceTypeORM } from '../value-objects/balance.typeorm';
import { ParticipanteIdTypeORM } from '../value-objects/participantes-id.typeorm';
import { AuditTrailTypeORM } from '../../../../../eventos/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

@Entity('asistencia')
@Unique('UQ_accounts_number', ['number.value'])
export class AccountTypeORM {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public id: number;

  @Column((type) => AccountNumberTypeORM, { prefix: false })
  public number: AccountNumberTypeORM;

  //@Column((type) => BalanceTypeORM, { prefix: false })
  //public balance: BalanceTypeORM;

  @Column((type) => ParticipanteIdTypeORM, { prefix: false })
  public customerId: ParticipanteIdTypeORM;

  @Column((type) => AuditTrailTypeORM, { prefix: false })
  public auditTrail: AuditTrailTypeORM;
}