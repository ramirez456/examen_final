import { AggregateRoot } from '@nestjs/cqrs';
import { asistenciaId } from '../value-objects/asistencia-id.value';
import { participanteId } from '../value-objects/participante-id.value';
import { eventoId } from '../value-objects/evento-id.value';
import { AsistenciaMarcada } from '../events/asistencia-marcada.event';

export class Asistencia extends AggregateRoot {
  private id: asistenciaId;
  private participanteId: participanteId;
  private eventoId: number;

  public constructor(participanteId: participanteId, eventoId: number) {
    super();
    this.participanteId = participanteId;
    this.eventoId = eventoId;
  }

  public marcar() {
    const event = new AsistenciaMarcada(this.id.getValue(), this.participanteId.getValue(), this.eventoId);
    this.apply(event);
  }

  public exist(): boolean {
    return this.id != null && this.id.getValue() > 0;
  }

  public doesNotExist(): boolean {
    return !this.exist();
  }

  public getId(): asistenciaId {
    return this.id;
  }

  public getparticipanteId(): participanteId {
    return this.participanteId;
  }

  public geteventoId(): number {
    return this.eventoId;
  }

}