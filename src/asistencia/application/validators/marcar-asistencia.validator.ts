import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/eventos/application/app.notification';
import { Repository } from 'typeorm';
import { AccountTypeORM } from '../../infrastructure/persistence/typeorm/entities/asistencia.typeorm';
import { marcarAsistenciaRequest } from '../dtos/request/marcar-asistencia-request.dto';

@Injectable()
export class OpenAccountValidator {
  constructor(@InjectRepository(AccountTypeORM) private accountRepository: Repository<AccountTypeORM>) {}

  public async validate(openAccountRequestDto: marcarAsistenciaRequest): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const number: Number = openAccountRequestDto.participanteId;
    if (number) {
      notification.addError('Participante registradp', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    const accountTypeORM: AccountTypeORM = await this.accountRepository.createQueryBuilder().where("number = :number", { number }).getOne();
    if (accountTypeORM != null) {
      notification.addError('Account number is taken', null);
    }
    return notification;
  }
}