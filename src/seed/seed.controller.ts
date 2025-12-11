import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SeedService } from './seed.service';

@ApiTags('Seed')
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Post()
  @ApiOperation({
    summary: 'Poblar la base de datos con datos iniciales',
    description:
      'Este endpoint elimina todos los datos existentes y crea usuarios, categorías y productos de prueba',
  })
  executeSeed() {
    return this.seedService.executeSeed();
  }
}
