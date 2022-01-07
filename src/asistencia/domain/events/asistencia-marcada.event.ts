export class AsistenciaMarcada {
  constructor(
    public readonly id: number,
    public readonly participanteId: number,
    public readonly eventoId: number
  ) {
  }
}