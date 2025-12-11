import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoletasService } from './boletas.service';
import { BoletasController } from './boletas.controller';
import { Boleta } from './entities/boleta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Boleta])],
  controllers: [BoletasController],
  providers: [BoletasService],
  exports: [BoletasService],
})
export class BoletasModule {}
