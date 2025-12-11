import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'juan@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Password123' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Juan Pérez' })
  @IsString()
  @MinLength(3)
  fullName: string;

  @ApiProperty({ example: 'cliente', enum: ['admin', 'vendedor', 'cliente'] })
  @IsOptional()
  @IsIn(['admin', 'vendedor', 'cliente'])
  role?: string;
}
