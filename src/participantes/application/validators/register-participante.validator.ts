import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppNotification } from 'src/eventos/application/app.notification';
import { RegisterParticipanteRequest } from '../dtos/request/register-participante-request.dto';
import { Repository } from 'typeorm';
import { ParticipanteTypeORM } from '../../infrastructure/persistence/typeorm/entities/participante.typeorm';

@Injectable()
export class RegisterParticipanteValidator {
  constructor(
    @InjectRepository(ParticipanteTypeORM)
    private personRepository: Repository<ParticipanteTypeORM>,
  ) {
  }

  public async validate(
    registerPersonRequest: RegisterParticipanteRequest,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const firstName: string = registerPersonRequest.firstName ? registerPersonRequest.firstName.trim() : '';
    if (firstName.length <= 0) {
      notification.addError('firstName is required', null);
    }
    const lastName: string = registerPersonRequest.lastName ? registerPersonRequest.lastName.trim() : '';
    if (lastName.length <= 0) {
      notification.addError('lastName is required', null);
    }
    const dni: string = registerPersonRequest.dni ? registerPersonRequest.dni.trim() : '';
    if (dni.length <= 0) {
      notification.addError('dni is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    
    return notification;
  }
}