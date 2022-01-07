import { AccountTypeORM } from '../../infrastructure/persistence/typeorm/entities/asistencia.typeorm';
import { Asistencia } from '../../domain/entities/asistencia.entity';
import { AccountNumberTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/account-number.typeorm';
import { ParticipanteIdTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/participantes-id.typeorm';
//import { BalanceTypeORM } from '../../infrastructure/persistence/typeorm/value-objects/balance.typeorm';
import { AuditTrailTypeORM } from '../../../eventos/infrastructure/persistence/typeorm/value-objects/audit-trail.typeorm';

export class AsistenciaMapper {
  public static toTypeORM(account: Asistencia): AccountTypeORM {
    const accountTypeORM: AccountTypeORM = new AccountTypeORM();
    accountTypeORM.id = account.getId() != null ? account.getId().getValue() : 0;
    accountTypeORM.number = null;
    //accountTypeORM.balance = null;
    accountTypeORM.customerId = null;
    return accountTypeORM;
  }
}