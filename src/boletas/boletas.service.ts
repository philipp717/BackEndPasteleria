import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Boleta } from './entities/boleta.entity';
import { CreateBoletaDto } from './dto/create-boleta.dto';
import { UpdateBoletaDto } from './dto/update-boleta.dto';

@Injectable()
export class BoletasService {
  constructor(
    @InjectRepository(Boleta)
    private readonly boletaRepository: Repository<Boleta>,
  ) {}

  async create(createBoletaDto: CreateBoletaDto): Promise<Boleta> {
    const boleta = this.boletaRepository.create(createBoletaDto);
    return this.boletaRepository.save(boleta);
  }

  async findAll(): Promise<Boleta[]> {
    return this.boletaRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Boleta> {
    const boleta = await this.boletaRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!boleta) {
      throw new NotFoundException(`Boleta con ID ${id} no encontrada`);
    }
    return boleta;
  }

  async findByUser(userId: string): Promise<Boleta[]> {
    return this.boletaRepository.find({
      where: { userId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async update(id: string, updateBoletaDto: UpdateBoletaDto): Promise<Boleta> {
    const boleta = await this.findOne(id);
    Object.assign(boleta, updateBoletaDto);
    return this.boletaRepository.save(boleta);
  }

  async remove(id: string): Promise<void> {
    const boleta = await this.findOne(id);
    await this.boletaRepository.remove(boleta);
  }
}
