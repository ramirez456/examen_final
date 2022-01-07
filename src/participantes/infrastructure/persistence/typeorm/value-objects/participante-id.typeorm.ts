import { PrimaryGeneratedColumn } from 'typeorm';

export class ParticipanteIdTypeorm {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): ParticipanteIdTypeorm  {
    return new ParticipanteIdTypeorm(value);
  }
}