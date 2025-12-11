import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Categoria } from '../categorias/entities/categoria.entity';
import { Producto } from '../productos/entities/producto.entity';
import { Boleta } from '../boletas/entities/boleta.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Boleta)
    private readonly boletaRepository: Repository<Boleta>,
  ) {}

  async executeSeed() {
    await this.deleteAllData();
    await this.seedUsers();
    const categorias = await this.seedCategorias();
    await this.seedProductos(categorias);
    return { message: 'Seed ejecutado exitosamente' };
  }

  private async deleteAllData() {
    // Eliminar en orden inverso de dependencias para evitar errores de foreign key
    await this.boletaRepository.createQueryBuilder().delete().execute();
    await this.productoRepository.createQueryBuilder().delete().execute();
    await this.categoriaRepository.createQueryBuilder().delete().execute();
    await this.userRepository.createQueryBuilder().delete().execute();
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
        imagen: 'https://www.recetasnestle.cl/sites/default/files/styles/recipe_detail_desktop_new/public/srh_recipes/e96b2c4e4e344f1a6a4737506618731a.jpg?itok=zEPehN39',
        categoriaId: categorias[0].id,
        disponible: true,
      },
      {
        nombre: 'Torta de Tres Leches',
        descripcion: 'Suave torta bañada en tres leches',
        precio: 22000,
        stock: 8,
        imagen: 'https://gourmet.iprospect.cl/wp-content/uploads/2016/09/Torta-3-leches.jpg',
        categoriaId: categorias[0].id,
        disponible: true,
      },
      {
        nombre: 'Torta de Zanahoria',
        descripcion: 'Torta de zanahoria con crema de queso',
        precio: 24000,
        stock: 12,
        imagen: 'https://www.recetasnestle.cl/sites/default/files/srh_recipes/6a20f5c217ea950ae33221b7b18de535.jpg',
        categoriaId: categorias[0].id,
        disponible: true,
      },
      // Pasteles
      {
        nombre: 'Pastel de Frutilla',
        descripcion: 'Pastel individual con frutillas frescas',
        precio: 5000,
        stock: 20,
        imagen: 'https://cdn7.kiwilimon.com/recetaimagen/16297/640x640/8238.jpg.webp',
        categoriaId: categorias[1].id,
        disponible: true,
      },
      {
        nombre: 'Pastel de Limón',
        descripcion: 'Pastel con merengue de limón',
        precio: 4500,
        stock: 15,
        imagen: 'https://lasdeliciasdevivir.net/wp-content/uploads/2012/09/Pastel-Limon-Receta-Las-Delicias-Del-Buen-Vivir.jpg',
        categoriaId: categorias[1].id,
        disponible: true,
      },
      // Galletas
      {
        nombre: 'Galletas de Chocolate',
        descripcion: 'Galletas con chips de chocolate',
        precio: 2000,
        stock: 50,
        imagen: 'https://gourmet.iprospect.cl/wp-content/uploads/2018/02/Galletas-2-1.jpg',
        categoriaId: categorias[2].id,
        disponible: true,
      },
      {
        nombre: 'Galletas de Avena',
        descripcion: 'Galletas saludables de avena',
        precio: 1800,
        stock: 40,
        imagen: 'https://gourmet.iprospect.cl/wp-content/uploads/2017/08/Galletas-con-avena-VNUEVA-2025.jpg',
        categoriaId: categorias[2].id,
        disponible: true,
      },
      // Postres
      {
        nombre: 'Mousse de Chocolate',
        descripcion: 'Cremoso mousse de chocolate belga',
        precio: 6000,
        stock: 15,
        imagen: 'https://www.recetasnestlecam.com/sites/default/files/srh_recipes/369562012750bd46ceaeef5d59a23229.jpg',
        categoriaId: categorias[3].id,
        disponible: true,
      },
      {
        nombre: 'Tiramisú',
        descripcion: 'Clásico postre italiano',
        precio: 7000,
        stock: 10,
        imagen: 'https://gourmet.iprospect.cl/wp-content/uploads/2016/09/Tiramisu.png',
        categoriaId: categorias[3].id,
        disponible: true,
      },
      // Panadería
      {
        nombre: 'Pan Amasado',
        descripcion: 'Pan amasado tradicional',
        precio: 1000,
        stock: 30,
        imagen: 'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/7CSPTG5N75EATOXKGKLL5ZFJZM.jpg',
        categoriaId: categorias[4].id,
        disponible: true,
      },
      {
        nombre: 'Hallulla',
        descripcion: 'Hallulla fresca del día',
        precio: 800,
        stock: 40,
        imagen: 'https://easyways.cl/storage/20220203071448hallulla.jpg',
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
