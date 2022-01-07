import { GetParticipanteQuery } from '../../queries/get-paricipante.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetParticipantesDto } from '../../dtos/queries/get-participantes.dto';

@QueryHandler(GetParticipanteQuery)
export class GetParticipanteHandler implements IQueryHandler<GetParticipanteQuery> {
  constructor() {}

  async execute(query: GetParticipanteQuery) {
    const manager = getManager();
    const sql = `
    SELECT 
      id,
      first_name as firstName,
      last_name as lastName,
      dni
    FROM 
      participantes
    ORDER BY
      last_name, first_name;`;
    const ormCustomers = await manager.query(sql);
    if (ormCustomers.length <= 0) {
      return [];
    }
    const participantes: GetParticipantesDto[] = ormCustomers.map(function (ormCustomer) {
      let participanteDto = new GetParticipantesDto();
      participanteDto.id = Number(ormCustomer.id);
      participanteDto.firstName = ormCustomer.firstName;
      participanteDto.lastName = ormCustomer.lastName;
      participanteDto.dni = ormCustomer.dni;
      return participanteDto;
    });
    return participantes;
  }
}