import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AccountTypeORM } from './infrastructure/persistence/typeorm/entities/asistencia.typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsistenciaController } from './api/asistencia.controller';
import { AccountOpenedHandler } from './application/handlers/events/asistencia-marcada.handler';
import { asistenciaApplicationService } from './application/services/asistencia-application.service';
import { OpenAccountValidator } from './application/validators/marcar-asistencia.validator';
import { GetAsistenciaHandler } from './application/handlers/queries/get-asistencia.handler';
import { GetAccountByIdHandler } from './application/handlers/queries/get-account-by-id.handler';
//import { MoneyDepositedHandler } from './application/handlers/events/money-deposited.handler';
import { MarcarAsistenciaHandler } from './application/handlers/commands/marcar-asistencia.handler';
//import { MoneyWithdrawnHandler } from './application/handlers/events/money-withdrawn.handler';
//import { MoneyTransferredHandler } from './application/handlers/events/money-transferred.handler';

export const CommandHandlers = [MarcarAsistenciaHandler];
export const EventHandlers = [AccountOpenedHandler];
export const QueryHandlers = [GetAsistenciaHandler, GetAccountByIdHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([AccountTypeORM]),
  ],
  controllers: [AsistenciaController],
  providers: [
    asistenciaApplicationService,
    OpenAccountValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class AsistenciaModule {}