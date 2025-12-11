import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { BoletasService } from './boletas.service';
import { CreateBoletaDto } from './dto/create-boleta.dto';
import { UpdateBoletaDto } from './dto/update-boleta.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Boletas')
@Controller('boletas')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class BoletasController {
  constructor(private readonly boletasService: BoletasService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva boleta' })
  create(@Body() createBoletaDto: CreateBoletaDto) {
    return this.boletasService.create(createBoletaDto);
  }

  @Get()
  @Roles('admin', 'vendedor')
  @ApiOperation({ summary: 'Obtener todas las boletas' })
  findAll() {
    return this.boletasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una boleta por ID' })
  findOne(@Param('id') id: string) {
    return this.boletasService.findOne(id);
  }

  @Get('usuario/:userId')
  @ApiOperation({ summary: 'Obtener boletas de un usuario' })
  findByUser(@Param('userId') userId: string) {
    return this.boletasService.findByUser(userId);
  }

  @Patch(':id')
  @Roles('admin', 'vendedor')
  @ApiOperation({ summary: 'Actualizar una boleta' })
  update(@Param('id') id: string, @Body() updateBoletaDto: UpdateBoletaDto) {
    return this.boletasService.update(id, updateBoletaDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar una boleta (solo admin)' })
  remove(@Param('id') id: string) {
    return this.boletasService.remove(id);
  }
}
