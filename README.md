# Backend Pastelería Los Sabores

API REST desarrollada con NestJS para la gestión de la Pastelería Los Sabores. Incluye sistema de autenticación JWT, gestión de productos, categorías, usuarios y boletas de compra.

## 🚀 Características

- **Autenticación JWT**: Sistema completo de registro e inicio de sesión
- **Gestión de Usuarios**: CRUD completo con roles (admin, vendedor, cliente)
- **Gestión de Productos**: Crear, leer, actualizar y eliminar productos
- **Gestión de Categorías**: Organización de productos por categorías
- **Gestión de Boletas**: Sistema de compras con estado de pedidos
- **Documentación Swagger**: API completamente documentada
- **Validación de Datos**: Validación automática en todos los endpoints
- **Seguridad**: Contraseñas encriptadas con bcrypt

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [XAMPP](https://www.apachefriends.org/) con Apache y MySQL
- Git

## 🔧 Instalación y Configuración

### 1. Clonar el Repositorio

```bash
git clone <tu-repositorio>
cd BackEndPasteleria-1
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar XAMPP

1. Abre el Panel de Control de XAMPP
2. Inicia los servicios de **Apache** y **MySQL**
3. Asegúrate de que MySQL esté corriendo en el puerto **3307**

> **Nota**: El proyecto está configurado para usar el puerto 3307. Si usas el puerto por defecto (3306), deberás modificar el archivo `.env`.

### 4. Crear la Base de Datos

1. Abre [phpMyAdmin](http://localhost/phpmyadmin)
2. Crea una nueva base de datos llamada `pasteleria`
3. O ejecuta este comando SQL:

```sql
CREATE DATABASE pasteleria;
```

### 5. Configurar Variables de Entorno

El archivo `.env` ya está creado con la siguiente configuración:

```env
# Configuración de Base de Datos MySQL (XAMPP)
DB_TYPE=mysql
DB_HOST=127.0.0.1
DB_PORT=3307
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=pasteleria

# Configuración JWT
JWT_SECRET=pasteleria_los_sabores_secret_key_2024_super_seguro
JWT_EXPIRES=1d

# Entorno de ejecución
NODE_ENV=development
```

> **Importante**: Si tu MySQL usa un puerto diferente o tiene contraseña, modifica estos valores en el archivo `.env`.

### 6. Iniciar el Servidor

```bash
npm run start:dev
```

El servidor se iniciará en modo desarrollo y verás en la consola:

```
✔ Aplicación corriendo en: http://localhost:3000
✔ Swagger UI: http://localhost:3000/docs
```

### 7. Poblar la Base de Datos (Seed)

Una vez que el servidor esté corriendo:

1. Abre tu navegador y ve a: [http://localhost:3000/docs](http://localhost:3000/docs)
2. Desplázate hasta el final de la página
3. Busca la sección **"Seed"**
4. Ejecuta el endpoint `POST /api/v1/seed` haciendo clic en "Try it out" → "Execute"

Esto creará:
- **3 usuarios de prueba** (admin, vendedor, cliente)
- **5 categorías** (Tortas, Pasteles, Galletas, Postres, Panadería)
- **11 productos** distribuidos en las categorías

#### Credenciales de Usuarios Creados

| Rol | Email | Contraseña |
|-----|-------|------------|
| Admin | admin@pasteleria.com | admin123 |
| Vendedor | vendedor@pasteleria.com | vendedor123 |
| Cliente | cliente@pasteleria.com | cliente123 |

## 📚 Uso de la API

### Acceder a Swagger UI

Toda la documentación interactiva de la API está disponible en:

**[http://localhost:3000/docs](http://localhost:3000/docs)**

### Autenticación con JWT

Para usar endpoints protegidos:

1. Ve a la sección **"Autenticación"** en Swagger
2. Usa el endpoint `POST /api/v1/auth/login` con las credenciales:
   ```json
   {
     "email": "admin@pasteleria.com",
     "password": "admin123"
   }
   ```
3. Copia el `access_token` que recibes en la respuesta
4. En Swagger, haz clic en el botón **"Authorize"** (🔒) en la parte superior
5. Pega el token en el campo: `Bearer <tu_token_aqui>`
6. Haz clic en "Authorize" y luego "Close"

Ahora podrás acceder a todos los endpoints protegidos.

## 📁 Estructura del Proyecto

```
src/
├── auth/              # Autenticación y autorización (JWT, Guards, Decorators)
│   ├── decorators/    # Decoradores personalizados (Roles)
│   ├── dto/           # DTOs para login y registro
│   ├── guards/        # Guards de autenticación y roles
│   └── strategies/    # Estrategia JWT
├── users/             # Gestión de usuarios
│   ├── dto/           # DTOs de usuarios
│   └── entities/      # Entidad User
├── productos/         # Gestión de productos
│   ├── dto/           # DTOs de productos
│   └── entities/      # Entidad Producto
├── categorias/        # Gestión de categorías
│   ├── dto/           # DTOs de categorías
│   └── entities/      # Entidad Categoria
├── boletas/           # Gestión de boletas de compra
│   ├── dto/           # DTOs de boletas
│   └── entities/      # Entidad Boleta
├── seed/              # Datos iniciales para la base de datos
├── app.module.ts      # Módulo principal
└── main.ts            # Punto de entrada de la aplicación
```

## 🛠️ Tecnologías Utilizadas

- **NestJS** - Framework de Node.js
- **TypeORM** - ORM para TypeScript
- **MySQL** - Base de datos
- **JWT** - Autenticación
- **Swagger** - Documentación de API
- **class-validator** - Validación de datos
- **bcrypt** - Encriptación de contraseñas
- **Passport** - Middleware de autenticación

## 📝 Scripts Disponibles

```bash
# Desarrollo con hot-reload
npm run start:dev

# Compilar el proyecto
npm run build

# Producción
npm run start:prod

# Ejecutar tests
npm run test

# Formatear código
npm run format

# Linting
npm run lint
```

## 🔐 Roles y Permisos

### Admin
- Crear, editar y eliminar usuarios
- Crear, editar y eliminar productos
- Crear, editar y eliminar categorías
- Ver y gestionar todas las boletas

### Vendedor
- Ver lista de usuarios
- Ver productos y categorías
- Ver y actualizar boletas

### Cliente
- Registrarse y hacer login
- Ver productos y categorías
- Crear boletas
- Ver sus propias boletas

## 🔄 Endpoints Principales

### Autenticación
- `POST /api/v1/auth/register` - Registrar nuevo usuario
- `POST /api/v1/auth/login` - Iniciar sesión

### Usuarios
- `GET /api/v1/users` - Listar usuarios (admin/vendedor)
- `GET /api/v1/users/:id` - Obtener usuario
- `POST /api/v1/users` - Crear usuario (admin)
- `PATCH /api/v1/users/:id` - Actualizar usuario
- `DELETE /api/v1/users/:id` - Eliminar usuario (admin)

### Categorías
- `GET /api/v1/categorias` - Listar categorías (público)
- `GET /api/v1/categorias/:id` - Obtener categoría
- `POST /api/v1/categorias` - Crear categoría (admin)
- `PATCH /api/v1/categorias/:id` - Actualizar categoría (admin)
- `DELETE /api/v1/categorias/:id` - Eliminar categoría (admin)

### Productos
- `GET /api/v1/productos` - Listar productos (público)
- `GET /api/v1/productos/:id` - Obtener producto
- `GET /api/v1/productos/categoria/:categoriaId` - Productos por categoría
- `POST /api/v1/productos` - Crear producto (admin)
- `PATCH /api/v1/productos/:id` - Actualizar producto (admin)
- `DELETE /api/v1/productos/:id` - Eliminar producto (admin)

### Boletas
- `GET /api/v1/boletas` - Listar boletas (admin/vendedor)
- `GET /api/v1/boletas/:id` - Obtener boleta
- `GET /api/v1/boletas/usuario/:userId` - Boletas por usuario
- `POST /api/v1/boletas` - Crear boleta
- `PATCH /api/v1/boletas/:id` - Actualizar boleta (admin/vendedor)
- `DELETE /api/v1/boletas/:id` - Eliminar boleta (admin)

## 🔒 Seguridad

- Las contraseñas se encriptan usando **bcrypt**
- Autenticación mediante **JWT** (JSON Web Tokens)
- Validación de datos en todos los endpoints
- **Guards** para proteger rutas según roles de usuario
- **CORS** configurado para permitir peticiones desde el frontend

## 🐛 Solución de Problemas

### Error de conexión a MySQL
- Verifica que XAMPP esté corriendo
- Asegúrate de que el puerto en `.env` coincida con tu configuración de MySQL
- Verifica que la base de datos `pasteleria` exista

### Error al instalar dependencias
- Elimina `node_modules` y `package-lock.json`
- Ejecuta `npm install` nuevamente

### Token JWT inválido
- Verifica que hayas copiado el token completo
- Asegúrate de incluir "Bearer " antes del token en Swagger

## 📞 Contacto

Para preguntas o sugerencias sobre el backend, contacta al equipo de desarrollo.

## 📄 Licencia

Este proyecto es de uso académico para la Pastelería Los Sabores.