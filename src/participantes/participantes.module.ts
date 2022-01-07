import { Module } from '@nestjs/common';
import { ParticipanteController } from './api/participantes.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { RegisterParticipanteValidator } from './application/validators/register-participante.validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonRegisteredHandler } from './application/handlers/events/participante-registered.handler';
import { GetParticipanteHandler } from './application/handlers/queries/get-participante-person.handler';
import { PartcipanteApplicationService } from './application/services/participante-application.service';
import { RegisterPersonHandler } from './application/handlers/commands/register-participante.handler';
import { ParticipanteTypeORM } from './infrastructure/persistence/typeorm/entities/participante.typeorm';

export const CommandHandlers = [RegisterPersonHandler];
export const EventHandlers = [PersonRegisteredHandler];
export const QueryHandlers = [GetParticipanteHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([ParticipanteTypeORM]),
  ],
  exports: [TypeOrmModule],
  controllers: [ParticipanteController],
  providers: [
    PartcipanteApplicationService,
    RegisterParticipanteValidator,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class CustomersModule {}