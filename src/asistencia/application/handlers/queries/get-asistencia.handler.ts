import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { getManager } from 'typeorm';
import { GetAsistenciasQuery } from '../../queries/get-asistencias.query';
import { GetAsistenciaDto } from '../../dtos/queries/get-asistencia.dto';

@QueryHandler(GetAsistenciasQuery)
export class GetAsistenciaHandler implements IQueryHandler<GetAsistenciasQuery> {
  constructor() {}

  async execute(query: GetAsistenciasQuery) {
    const manager = getManager();
    const sql = `
    SELECT
      a.id,
      a.participanteId,
      a.eventoId
    FROM 
      asistencia a`;
    const ormAccounts = await manager.query(sql);
    if (ormAccounts.length <= 0) {
      return [];
    }
    const asistencia: GetAsistenciaDto[] = ormAccounts.map(function (ormAccount) {
      let accountDto = new GetAsistenciaDto();
      accountDto.Id = Number(ormAccount.id);
      accountDto.participanteId = ormAccount.participanteId;
      accountDto.eventoId = Number(ormAccount.eventoId);
      return accountDto;
    });
    return asistencia;
  }
}