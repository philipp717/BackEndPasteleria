import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductoBoletaDto {
  @ApiProperty({ example: 'uuid-del-producto' })
  @IsUUID()
  productoId: string;

  @ApiProperty({ example: 'Torta de Chocolate' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 2 })
  @IsNumber()
  @Min(1)
  cantidad: number;

  @ApiProperty({ example: 25000 })
  @IsNumber()
  @Min(0)
  precio: number;
}

export class CreateBoletaDto {
  @ApiProperty({ example: 'uuid-del-usuario' })
  @IsUUID()
  userId: string;

  @ApiProperty({
    type: [ProductoBoletaDto],
    example: [
      {
        productoId: 'uuid-producto',
        nombre: 'Torta de Chocolate',
        cantidad: 2,
        precio: 25000,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoBoletaDto)
  productos: ProductoBoletaDto[];

  @ApiProperty({ example: 50000 })
  @IsNumber()
  @Min(0)
  total: number;

  @ApiProperty({ example: 'Entregar antes de las 5pm', required: false })
  @IsString()
  @IsOptional()
  observaciones?: string;
}
