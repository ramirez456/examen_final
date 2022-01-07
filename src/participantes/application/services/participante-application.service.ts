import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterParticipanteRequest } from '../dtos/request/register-participante-request.dto';
import { RegisterParticipanteResponse } from '../dtos/response/register-participante-response.dto';
import { RegisterParticipanteValidator } from '../validators/register-participante.validator';
import { AppNotification } from 'src/eventos/application/app.notification';
import { Result } from 'typescript-result';
import { RegisterParticipante } from '../commands/register-participante.command';
import { DateTime } from '../../../eventos/domain/value-objects/date-time.value';
import { AppSettings } from '../../../eventos/application/app-settings';

@Injectable()
export class PartcipanteApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerParticipanteValidator: RegisterParticipanteValidator,
  ) {}

  async register(
    registerParticipanteRequest: RegisterParticipanteRequest,
  ): Promise<Result<AppNotification, RegisterParticipanteResponse>> {
    const notification: AppNotification = await this.registerParticipanteValidator.validate(registerParticipanteRequest);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const createdAt = DateTime.utcNow().format();
    const createdBy = AppSettings.SUPER_ADMIN;
    const updatedAt = null;
    const updatedBy = null;
    const registerPerson: RegisterParticipante = new RegisterParticipante(
      registerParticipanteRequest.firstName,
      registerParticipanteRequest.lastName,
      registerParticipanteRequest.dni,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy
    );
    const participanteId: number = await this.commandBus.execute(registerPerson);
    const registerResponse: RegisterParticipanteResponse = new RegisterParticipanteResponse(
      participanteId,
      registerParticipanteRequest.firstName,
      registerParticipanteRequest.lastName,
      registerParticipanteRequest.dni,
    );
    return Result.ok(registerResponse);
  }
}