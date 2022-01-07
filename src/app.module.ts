import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { CustomersModule } from './participantes/participantes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserModule from './users';
@Module({
  imports: [
    UserModule,
    CustomersModule,
    AsistenciaModule,
    TypeOrmModule.forRoot()
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
