import { DateTime } from "../value-objects/date-time.value";

export class EventoCreado {
    constructor(
      public readonly id: number,
      public readonly name: string,
      public readonly speaker: string,
      public readonly event_date: DateTime
    ) {
    }
  }