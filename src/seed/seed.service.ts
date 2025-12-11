import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { Producto } from '../productos/entities/producto.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  async executeSeed() {
    await this.deleteAllData();
    await this.seedUsers();
    const categorias = await this.seedCategorias();
    await this.seedProductos(categorias);
    return { message: 'Seed ejecutado exitosamente' };
  }

  private async deleteAllData() {
    await this.productoRepository.delete({});
    await this.categoriaRepository.delete({});
    await this.userRepository.delete({});
  }

  private async seedUsers() {
    const users = [
      {
        email: 'admin',
        password: '123456',
        fullName: 'Administrador',
        role: 'admin',
      },
      {
        email: 'vendedor@pasteleria.com',
        password: 'vendedor123',
        fullName: 'Vendedor Principal',
        role: 'vendedor',
      },
      {
        email: 'cliente@pasteleria.com',
        password: 'cliente123',
        fullName: 'Cliente de Prueba',
        role: 'cliente',
      },
    ];

    for (const userData of users) {
      const user = this.userRepository.create(userData);
      await this.userRepository.save(user);
    }
  }

  private async seedCategorias() {
    const categorias = [
      {
        nombre: 'Tortas',
        descripcion: 'Deliciosas tortas para toda ocasión',
      },
      {
        nombre: 'Pasteles',
        descripcion: 'Pasteles individuales y familiares',
      },
      {
        nombre: 'Galletas',
        descripcion: 'Galletas artesanales variadas',
      },
      {
        nombre: 'Postres',
        descripcion: 'Postres especiales de la casa',
      },
      {
        nombre: 'Panadería',
        descripcion: 'Pan fresco todos los días',
      },
    ];

    const categoriasCreadas = [];
    for (const categoriaData of categorias) {
      const categoria = this.categoriaRepository.create(categoriaData);
      const saved = await this.categoriaRepository.save(categoria);
      categoriasCreadas.push(saved);
    }
    return categoriasCreadas;
  }

  private async seedProductos(categorias: Categoria[]) {
    const productos = [
      // Tortas
      {
        nombre: 'Torta de Chocolate',
        descripcion: 'Deliciosa torta de chocolate con crema',
        precio: 25000,
        stock: 10,
        imagen: 'https://via.placeholder.com/300x200?text=Torta+Chocolate',
        categoriaId: categorias[0].id,
        disponible: true,
      },
      {
        nombre: 'Torta de Tres Leches',
        descripcion: 'Suave torta bañada en tres leches',
        precio: 22000,
        stock: 8,
        imagen: 'https://via.placeholder.com/300x200?text=Tres+Leches',
        categoriaId: categorias[0].id,
        disponible: true,
      },
      {
        nombre: 'Torta de Zanahoria',
        descripcion: 'Torta de zanahoria con crema de queso',
        precio: 24000,
        stock: 12,
        imagen: 'https://via.placeholder.com/300x200?text=Torta+Zanahoria',
        categoriaId: categorias[0].id,
        disponible: true,
      },
      // Pasteles
      {
        nombre: 'Pastel de Frutilla',
        descripcion: 'Pastel individual con frutillas frescas',
        precio: 5000,
        stock: 20,
        imagen: 'https://via.placeholder.com/300x200?text=Pastel+Frutilla',
        categoriaId: categorias[1].id,
        disponible: true,
      },
      {
        nombre: 'Pastel de Limón',
        descripcion: 'Pastel con merengue de limón',
        precio: 4500,
        stock: 15,
        imagen: 'https://via.placeholder.com/300x200?text=Pastel+Limon',
        categoriaId: categorias[1].id,
        disponible: true,
      },
      // Galletas
      {
        nombre: 'Galletas de Chocolate',
        descripcion: 'Galletas con chips de chocolate',
        precio: 2000,
        stock: 50,
        imagen: 'https://via.placeholder.com/300x200?text=Galletas+Chocolate',
        categoriaId: categorias[2].id,
        disponible: true,
      },
      {
        nombre: 'Galletas de Avena',
        descripcion: 'Galletas saludables de avena',
        precio: 1800,
        stock: 40,
        imagen: 'https://via.placeholder.com/300x200?text=Galletas+Avena',
        categoriaId: categorias[2].id,
        disponible: true,
      },
      // Postres
      {
        nombre: 'Mousse de Chocolate',
        descripcion: 'Cremoso mousse de chocolate belga',
        precio: 6000,
        stock: 15,
        imagen: 'https://via.placeholder.com/300x200?text=Mousse+Chocolate',
        categoriaId: categorias[3].id,
        disponible: true,
      },
      {
        nombre: 'Tiramisú',
        descripcion: 'Clásico postre italiano',
        precio: 7000,
        stock: 10,
        imagen: 'https://via.placeholder.com/300x200?text=Tiramisu',
        categoriaId: categorias[3].id,
        disponible: true,
      },
      // Panadería
      {
        nombre: 'Pan Amasado',
        descripcion: 'Pan amasado tradicional',
        precio: 1000,
        stock: 30,
        imagen: 'https://via.placeholder.com/300x200?text=Pan+Amasado',
        categoriaId: categorias[4].id,
        disponible: true,
      },
      {
        nombre: 'Hallulla',
        descripcion: 'Hallulla fresca del día',
        precio: 800,
        stock: 40,
        imagen: 'https://via.placeholder.com/300x200?text=Hallulla',
        categoriaId: categorias[4].id,
        disponible: true,
      },
    ];

    for (const productoData of productos) {
      const producto = this.productoRepository.create(productoData);
      await this.productoRepository.save(producto);
    }
  }
}
