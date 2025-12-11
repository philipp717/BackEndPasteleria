// API Base URL
export const API_BASE_URL = 'http://localhost:3000/api/v1';

// Ejemplo de configuración de Axios para el frontend
// Puedes usar esto en tu frontend React

/*
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir el token JWT automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
*/

// Endpoints disponibles para el frontend:

/* 
===================================
AUTENTICACIÓN
===================================
POST /api/v1/auth/login
Body: { username: string, password: string }
Response: { access_token: string, token: string, user: {...} }

POST /api/v1/auth/register
Body: { email: string, password: string, fullName: string }
Response: { access_token: string, token: string, user: {...} }


===================================
USUARIOS (requieren autenticación)
===================================
GET /api/v1/users
Headers: { Authorization: 'Bearer <token>' }
Response: User[]

GET /api/v1/users/:id
Headers: { Authorization: 'Bearer <token>' }
Response: User

POST /api/v1/users (solo admin)
Headers: { Authorization: 'Bearer <token>' }
Body: { email: string, password: string, fullName: string, role?: string }
Response: User

PATCH /api/v1/users/:id
Headers: { Authorization: 'Bearer <token>' }
Body: { ...campos a actualizar }
Response: User

DELETE /api/v1/users/:id (solo admin)
Headers: { Authorization: 'Bearer <token>' }
Response: void


===================================
CATEGORÍAS
===================================
GET /api/v1/categorias (público)
Response: Categoria[]

GET /api/v1/categorias/:id (público)
Response: Categoria

POST /api/v1/categorias (solo admin con token)
Headers: { Authorization: 'Bearer <token>' }
Body: { nombre: string, descripcion?: string }
Response: Categoria

PATCH /api/v1/categorias/:id (solo admin con token)
Headers: { Authorization: 'Bearer <token>' }
Body: { ...campos a actualizar }
Response: Categoria

DELETE /api/v1/categorias/:id (solo admin con token)
Headers: { Authorization: 'Bearer <token>' }
Response: void


===================================
PRODUCTOS
===================================
GET /api/v1/productos (público)
Response: Producto[]

GET /api/v1/productos/:id (público)
Response: Producto

GET /api/v1/productos/categoria/:categoriaId (público)
Response: Producto[]

POST /api/v1/productos (solo admin con token)
Headers: { Authorization: 'Bearer <token>' }
Body: { 
  nombre: string, 
  descripcion: string, 
  precio: number, 
  stock?: number,
  imagen?: string,
  categoriaId: string,
  disponible?: boolean
}
Response: Producto

PATCH /api/v1/productos/:id (solo admin con token)
Headers: { Authorization: 'Bearer <token>' }
Body: { ...campos a actualizar }
Response: Producto

DELETE /api/v1/productos/:id (solo admin con token)
Headers: { Authorization: 'Bearer <token>' }
Response: void


===================================
BOLETAS (requieren autenticación)
===================================
GET /api/v1/boletas (admin/vendedor)
Headers: { Authorization: 'Bearer <token>' }
Response: Boleta[]

GET /api/v1/boletas/:id
Headers: { Authorization: 'Bearer <token>' }
Response: Boleta

GET /api/v1/boletas/usuario/:userId
Headers: { Authorization: 'Bearer <token>' }
Response: Boleta[]

POST /api/v1/boletas
Headers: { Authorization: 'Bearer <token>' }
Body: { 
  userId: string,
  productos: [{ productoId: string, nombre: string, cantidad: number, precio: number }],
  total: number,
  observaciones?: string
}
Response: Boleta

PATCH /api/v1/boletas/:id (admin/vendedor)
Headers: { Authorization: 'Bearer <token>' }
Body: { estado?: 'pendiente' | 'pagado' | 'cancelado' }
Response: Boleta

DELETE /api/v1/boletas/:id (solo admin)
Headers: { Authorization: 'Bearer <token>' }
Response: void


===================================
SEED (solo para desarrollo)
===================================
POST /api/v1/seed
Response: { message: string }

Esto crea:
- Usuario admin: admin / 123456
- Usuario vendedor: vendedor@pasteleria.com / vendedor123
- Usuario cliente: cliente@pasteleria.com / cliente123
- 5 categorías
- 11 productos de prueba
*/
