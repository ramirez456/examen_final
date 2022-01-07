import { ParticipanteId } from '../../../participantes/domain/value-objects/participante-id.value';
import { Asistencia } from '../entities/asistencia.entity';
import { asistenciaId } from '../value-objects/asistencia-id.value';

export class AccountFactory {
  public static createFrom(participanteId: ParticipanteId, eventoId: number): Asistencia {
    return new Asistencia(participanteId, eventoId);
  }

  public static withId(participanteId: ParticipanteId, eventoId: number): Asistencia {
    let asistencia: Asistencia = new Asistencia(participanteId, eventoId);
    //account.changeId(participanteId);
    return asistencia;
  }
}