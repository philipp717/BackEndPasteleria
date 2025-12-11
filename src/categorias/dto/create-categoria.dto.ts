import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({ example: 'Tortas' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Tortas para toda ocasión', required: false })
  @IsString()
  @IsOptional()
  descripcion?: string;
}
