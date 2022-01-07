import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MarcarAsistencia } from '../commands/marcar-asistencia.command';
import { MarcarAsistenciaResponse } from '../dtos/response/marcar-asistencia-response.dto';
import { OpenAccountValidator } from '../validators/marcar-asistencia.validator';
import { AppNotification } from 'src/eventos/application/app.notification';
import { Result } from 'typescript-result';
import { marcarAsistenciaRequest } from '../dtos/request/marcar-asistencia-request.dto';

@Injectable()
export class asistenciaApplicationService {
  constructor(
    private commandBus: CommandBus,
    private openAccountValidator: OpenAccountValidator,
  ) {}

  async open(openAccountRequestDto: marcarAsistenciaRequest): Promise<Result<AppNotification, MarcarAsistenciaResponse>> {
    const notification: AppNotification = await this.openAccountValidator.validate(openAccountRequestDto);
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const openAccount: MarcarAsistencia = new MarcarAsistencia(
      openAccountRequestDto.participanteId,
      openAccountRequestDto.eventoId
    );
    const accountId: number = await this.commandBus.execute(openAccount);
    const openAccountResponse: MarcarAsistenciaResponse = new MarcarAsistenciaResponse(
      null,openAccount.participanteId, openAccount.eventoId
    );
    return Result.ok(openAccountResponse);
  }
}