import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  IsBoolean,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty({ example: 'Torta de Chocolate' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Deliciosa torta de chocolate con crema' })
  @IsString()
  descripcion: string;

  @ApiProperty({ example: 25000 })
  @IsNumber()
  @Min(0)
  precio: number;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @ApiProperty({ example: 'https://example.com/imagen.jpg', required: false })
  @IsString()
  @IsOptional()
  imagen?: string;

  @ApiProperty({ example: 'uuid-de-categoria' })
  @IsUUID()
  categoriaId: string;

  @ApiProperty({ example: true, required: false })
  @IsBoolean()
  @IsOptional()
  disponible?: boolean;
}
