import { Controller, Post, Body, Res, Get } from '@nestjs/common';
import { RegisterParticipanteRequest } from '../application/dtos/request/register-participante-request.dto';
import { RegisterParticipanteResponse } from '../application/dtos/response/register-participante-response.dto';
import { Result } from 'typescript-result';
import { AppNotification } from '../../eventos/application/app.notification';
import { ApiController } from '../../eventos/api/api.controller';
import { QueryBus } from '@nestjs/cqrs';
import { GetParticipanteQuery } from '../application/queries/get-paricipante.query';
import { PartcipanteApplicationService } from '../application/services/participante-application.service';

@Controller('participante')
export class ParticipanteController {
  constructor(
    private readonly participanteApplicationService: PartcipanteApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post('/usuario')
  async registerPerson(
    @Body() registerPersonRequest: RegisterParticipanteRequest,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterParticipanteResponse> = await this.participanteApplicationService.register(registerPersonRequest);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

  @Get('/usuarios')
  async getCustomersPerson(@Res({ passthrough: true }) response): Promise<object> {
    try {
      const customers = await this.queryBus.execute(new GetParticipanteQuery());
      return ApiController.ok(response, customers);
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }

}