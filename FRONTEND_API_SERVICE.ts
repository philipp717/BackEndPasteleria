// =========================================
// ARCHIVO PARA EL FRONTEND: src/services/api.ts
// Copia este archivo en tu proyecto React
// =========================================

import axios from 'axios';

// Configuración base de la API
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
      // Opcional: redirigir a login
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ===================================
// SERVICIOS DE AUTENTICACIÓN
// ===================================

export const authService = {
  // Login
  login: async (username: string, password: string) => {
    const response = await api.post('/auth/login', { username, password });
    const { token, user } = response.data;
    
    // Guardar token y usuario en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return response.data;
  },

  // Registro
  register: async (email: string, password: string, fullName: string) => {
    const response = await api.post('/auth/register', { email, password, fullName });
    const { token, user } = response.data;
    
    // Guardar token y usuario en localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    return response.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },
};

// ===================================
// SERVICIOS DE PRODUCTOS
// ===================================

export const productosService = {
  // Obtener todos los productos
  getAll: async () => {
    const response = await api.get('/productos');
    return response.data;
  },

  // Obtener un producto por ID
  getById: async (id: string) => {
    const response = await api.get(`/productos/${id}`);
    return response.data;
  },

  // Obtener productos por categoría
  getByCategoria: async (categoriaId: string) => {
    const response = await api.get(`/productos/categoria/${categoriaId}`);
    return response.data;
  },

  // Crear producto (solo admin)
  create: async (producto: {
    nombre: string;
    descripcion: string;
    precio: number;
    stock?: number;
    imagen?: string;
    categoriaId: string;
    disponible?: boolean;
  }) => {
    const response = await api.post('/productos', producto);
    return response.data;
  },

  // Actualizar producto (solo admin)
  update: async (id: string, producto: Partial<any>) => {
    const response = await api.patch(`/productos/${id}`, producto);
    return response.data;
  },

  // Eliminar producto (solo admin)
  delete: async (id: string) => {
    const response = await api.delete(`/productos/${id}`);
    return response.data;
  },
};

// ===================================
// SERVICIOS DE CATEGORÍAS
// ===================================

export const categoriasService = {
  // Obtener todas las categorías
  getAll: async () => {
    const response = await api.get('/categorias');
    return response.data;
  },

  // Obtener una categoría por ID
  getById: async (id: string) => {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  },

  // Crear categoría (solo admin)
  create: async (categoria: { nombre: string; descripcion?: string }) => {
    const response = await api.post('/categorias', categoria);
    return response.data;
  },

  // Actualizar categoría (solo admin)
  update: async (id: string, categoria: Partial<any>) => {
    const response = await api.patch(`/categorias/${id}`, categoria);
    return response.data;
  },

  // Eliminar categoría (solo admin)
  delete: async (id: string) => {
    const response = await api.delete(`/categorias/${id}`);
    return response.data;
  },
};

// ===================================
// SERVICIOS DE BOLETAS
// ===================================

export const boletasService = {
  // Obtener todas las boletas (admin/vendedor)
  getAll: async () => {
    const response = await api.get('/boletas');
    return response.data;
  },

  // Obtener una boleta por ID
  getById: async (id: string) => {
    const response = await api.get(`/boletas/${id}`);
    return response.data;
  },

  // Obtener boletas de un usuario
  getByUser: async (userId: string) => {
    const response = await api.get(`/boletas/usuario/${userId}`);
    return response.data;
  },

  // Crear boleta (finalizar compra)
  create: async (boleta: {
    userId: string;
    productos: Array<{
      productoId: string;
      nombre: string;
      cantidad: number;
      precio: number;
    }>;
    total: number;
    observaciones?: string;
  }) => {
    const response = await api.post('/boletas', boleta);
    return response.data;
  },

  // Actualizar estado de boleta (admin/vendedor)
  updateEstado: async (id: string, estado: 'pendiente' | 'pagado' | 'cancelado') => {
    const response = await api.patch(`/boletas/${id}`, { estado });
    return response.data;
  },

  // Eliminar boleta (solo admin)
  delete: async (id: string) => {
    const response = await api.delete(`/boletas/${id}`);
    return response.data;
  },
};

// ===================================
// SERVICIOS DE USUARIOS
// ===================================

export const usersService = {
  // Obtener todos los usuarios
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Obtener un usuario por ID
  getById: async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Crear usuario (solo admin)
  create: async (user: {
    email: string;
    password: string;
    fullName: string;
    role?: string;
  }) => {
    const response = await api.post('/users', user);
    return response.data;
  },

  // Actualizar usuario
  update: async (id: string, user: Partial<any>) => {
    const response = await api.patch(`/users/${id}`, user);
    return response.data;
  },

  // Eliminar usuario (solo admin)
  delete: async (id: string) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  },
};

// ===================================
// SERVICIO DE SEED (solo desarrollo)
// ===================================

export const seedService = {
  // Ejecutar seed (poblar base de datos)
  execute: async () => {
    const response = await api.post('/seed');
    return response.data;
  },
};

export default api;
