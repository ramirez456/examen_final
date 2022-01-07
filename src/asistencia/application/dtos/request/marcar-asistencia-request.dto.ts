export class marcarAsistenciaRequest {
  constructor(
    public readonly participanteId: number,
    public readonly eventoId: number
  ) {
  }
}