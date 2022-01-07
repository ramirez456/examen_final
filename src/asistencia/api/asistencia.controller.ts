import { Controller, Post, Body, Res, Get, Patch, Param } from '@nestjs/common';
import { marcarAsistenciaRequest } from '../application/dtos/request/marcar-asistencia-request.dto';
import { MarcarAsistenciaResponse } from '../application/dtos/response/marcar-asistencia-response.dto';
import { asistenciaApplicationService } from '../application/services/asistencia-application.service';
import { Result } from 'typescript-result';
import { AppNotification } from '../../eventos/application/app.notification';
import { ApiController } from '../../eventos/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetAsistenciaByIdQuery } from '../application/queries/get-asistencia-by-id.query';
import { GetAsistenciasQuery } from '../application/queries/get-asistencias.query';

@Controller('asistencia')
export class AsistenciaController {
  constructor(
    private readonly asistenciaApplicationService: asistenciaApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async marcar(
    @Body() marcarAsistenciaRequest: marcarAsistenciaRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, MarcarAsistenciaResponse> = await this.asistenciaApplicationService.open(marcarAsistenciaRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get()
  async getAsistencias(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const participante = await this.queryBus.execute(new GetAsistenciasQuery());
      return ApiController.ok(response, participante);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
  @Get('hola')
  hola( ){
    return "estamos dentro dwel hola";
  }
  

  @Get('/:id')
  async getById(@Param('id') asistenciaId: number, @Res({ passthrough: true }) response): Promise<object> {
    try {
      const participante = await this.queryBus.execute(new GetAsistenciaByIdQuery(asistenciaId));
      return ApiController.ok(response, participante);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}