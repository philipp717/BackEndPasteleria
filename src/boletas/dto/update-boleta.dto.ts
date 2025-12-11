import { PartialType } from '@nestjs/swagger';
import { CreateBoletaDto } from './create-boleta.dto';
import { IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoletaDto extends PartialType(CreateBoletaDto) {
  @ApiProperty({ example: 'pagado', enum: ['pendiente', 'pagado', 'cancelado'] })
  @IsOptional()
  @IsIn(['pendiente', 'pagado', 'cancelado'])
  estado?: string;
}
