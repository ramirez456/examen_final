import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from 'typescript-result';
import { AppNotification } from '../../../../eventos/application/app.notification';
import { MarcarAsistencia } from '../../commands/marcar-asistencia.command';
import { AccountTypeORM } from '../../../infrastructure/persistence/typeorm/entities/asistencia.typeorm';
//import { AccountNumber } from '../../../domain/value-objects/account-number.value';
//import { Money } from '../../../../common/domain/value-objects/money.value';
//import { Currency } from '../../../../common/domain/enums/currency.enum';
import { AccountFactory } from '../../../domain/factories/asistencia.factory';
import { Asistencia } from '../../../domain/entities/asistencia.entity';
import { AsistenciaMapper } from '../../mappers/asistencia.mapper';
import { ParticipanteId } from '../../../../participantes/domain/value-objects/participante-id.value';
import { asistenciaId } from '../../../domain/value-objects/asistencia-id.value';

@CommandHandler(MarcarAsistencia)
export class MarcarAsistenciaHandler
  implements ICommandHandler<MarcarAsistencia> {
  constructor(
    @InjectRepository(AccountTypeORM)
    private accountRepository: Repository<AccountTypeORM>,
    private publisher: EventPublisher,
  ) {
  }

  async execute(command: MarcarAsistencia) {
    let participanteId: ParticipanteId;
    //const participanteNumberResult: Result<AppNotification, AccountNumber> = AccountNumber.create(command.participanteId);
    //if (participanteNumberResult.isFailure()) {
      //return participanteId;
    //}
    //const balance: Money = Money.create(0, Currency.SOLES);
    const eventoId=1;
    //const customerId: CustomerId = CustomerId.of(command.participanteId);
    const participante=1;
    let account: Asistencia = AccountFactory.createFrom(participanteId, eventoId);
    let accountTypeORM: AccountTypeORM = AsistenciaMapper.toTypeORM(account);
    accountTypeORM = await this.accountRepository.save(accountTypeORM);
    if (accountTypeORM == null) {
      return participanteId;
    }
    //participanteId = accountTypeORM.id;
    //account.changeId(asistenciaId.of(participanteId));
    //account = this.publisher.mergeObjectContext(account);
    //account.open();
    //account.commit();
    return participanteId;
  }
}