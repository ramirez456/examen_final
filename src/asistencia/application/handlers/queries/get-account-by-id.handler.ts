import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetAsistenciaDto } from '../../dtos/queries/get-asistencia.dto';
import { GetAsistenciaByIdQuery } from '../../queries/get-asistencia-by-id.query';

@QueryHandler(GetAsistenciaByIdQuery)
export class GetAccountByIdHandler implements IQueryHandler<GetAsistenciaByIdQuery> {
  constructor() {}

  async execute(query: GetAsistenciaByIdQuery) {
    const manager = getManager();
    const sql = `
    SELECT
      a.id,
      a.number,
      a.balance,
      a.customer_id,
      a.created_at,
      a.created_by,
      a.updated_at,
      a.updated_by
    FROM 
      accounts a
    WHERE
      a.id = ?;`;
    const ormAccounts = await manager.query(sql, [query.asistenciaId]);
    if (ormAccounts.length <= 0) {
      return {};
    }
    const ormAccount = ormAccounts[0];
    let accountDto = new GetAsistenciaDto();
    accountDto.Id = Number(ormAccount.Id);
    accountDto.participanteId = Number(ormAccount.participanteId);
    accountDto.eventoId = Number(ormAccount.eventoId);
    return accountDto;
  }
}