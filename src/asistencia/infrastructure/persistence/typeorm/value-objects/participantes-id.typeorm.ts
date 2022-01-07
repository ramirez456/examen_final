import { Column } from 'typeorm';

export class ParticipanteIdTypeORM {
  @Column('bigint', { name: 'customer_id', unsigned: true })
  public value: number;

  private constructor(value: number) {
    this.value = Number(value);
  }

  public static from(value: number): ParticipanteIdTypeORM  {
    return new ParticipanteIdTypeORM(value);
  }
}