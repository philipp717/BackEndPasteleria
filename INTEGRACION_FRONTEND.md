# 🔗 Guía de Integración Backend + Frontend

## 📝 Cambios necesarios en el Frontend

### 1️⃣ Instalar Axios en el Frontend

```bash
cd <tu-proyecto-frontend>
npm install axios
```

### 2️⃣ Copiar el servicio API

Copia el archivo `FRONTEND_API_SERVICE.ts` a tu proyecto frontend:
```
src/services/api.ts
```

### 3️⃣ Actualizar AuthProvider.tsx

Reemplaza la autenticación simulada con llamadas reales a la API:

```typescript
import { authService } from '../services/api';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const data = await authService.login(username, password);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    }
  };

  const register = async (userData: any) => {
    try {
      const data = await authService.register(
        userData.email,
        userData.password,
        userData.fullName || userData.name
      );
      setUser(data.user);
      return true;
    } catch (error) {
      console.error('Error en registro:', error);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 4️⃣ Actualizar CakeContext.tsx

Reemplaza los datos hardcodeados con llamadas a la API:

```typescript
import { productosService } from '../services/api';

export const CakeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cakes, setCakes] = useState<Cake[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos al montar el componente
  useEffect(() => {
    loadCakes();
  }, []);

  const loadCakes = async () => {
    try {
      setLoading(true);
      const productos = await productosService.getAll();
      
      // Convertir formato del backend al formato del frontend
      const cakesFormatted = productos.map((p: any) => ({
        id: p.id,
        name: p.nombre,
        description: p.descripcion,
        price: p.precio,
        image: p.imagen || 'https://placehold.co/300x200',
      }));
      
      setCakes(cakesFormatted);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCake = async (cake: Omit<Cake, 'id'>) => {
    try {
      // Obtener la primera categoría disponible (o crear lógica para seleccionar)
      const categorias = await categoriasService.getAll();
      const categoriaId = categorias[0]?.id;

      const newCake = await productosService.create({
        nombre: cake.name,
        descripcion: cake.description,
        precio: cake.price,
        imagen: cake.image,
        categoriaId: categoriaId,
        stock: 10,
        disponible: true,
      });

      // Recargar productos
      await loadCakes();
    } catch (error) {
      console.error('Error creando producto:', error);
    }
  };

  const deleteCake = async (id: string) => {
    try {
      await productosService.delete(id);
      setCakes(prev => prev.filter(cake => cake.id !== id));
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  };

  return (
    <CakeContext.Provider value={{ cakes, addCake, deleteCake, searchQuery, setSearchQuery }}>
      {children}
    </CakeContext.Provider>
  );
};
```

### 5️⃣ Actualizar CartPage.tsx (Finalizar Compra)

Reemplaza la alerta con una llamada real a la API:

```typescript
import { boletasService, authService } from '../services/api';

export const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handleFinalizarCompra = async () => {
    try {
      const currentUser = authService.getCurrentUser();
      
      if (!currentUser) {
        alert('Debes iniciar sesión para finalizar la compra');
        navigate('/login');
        return;
      }

      const boleta = {
        userId: currentUser.id,
        productos: cartItems.map(item => ({
          productoId: item.id,
          nombre: item.name,
          cantidad: item.quantity,
          precio: item.price,
        })),
        total: total,
        observaciones: '',
      };

      await boletasService.create(boleta);
      
      alert('¡Compra realizada con éxito!');
      clearCart();
      navigate('/');
    } catch (error) {
      console.error('Error al finalizar compra:', error);
      alert('Error al procesar la compra. Por favor intenta nuevamente.');
    }
  };

  return (
    <MainLayout>
      {/* ... resto del código ... */}
      <Button 
        label="Finalizar Compra" 
        onClick={handleFinalizarCompra}
        style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-text)' }}
      />
      {/* ... */}
    </MainLayout>
  );
};
```

## 🚀 Pasos para Ejecutar

### Backend:

1. **Instalar dependencias:**
```bash
cd BackEndPasteleria-1
npm install
```

2. **Iniciar XAMPP:**
   - Abrir XAMPP
   - Iniciar Apache y MySQL (puerto 3307)

3. **Crear base de datos:**
```sql
CREATE DATABASE pasteleria;
```

4. **Iniciar servidor:**
```bash
npm run start:dev
```

5. **Poblar base de datos:**
   - Ve a http://localhost:3000/docs
   - Ejecuta `POST /api/v1/seed`

### Frontend:

1. **Actualizar el código con los cambios mencionados arriba**

2. **Instalar axios:**
```bash
npm install axios
```

3. **Iniciar el frontend:**
```bash
npm run dev
```

## ✅ Credenciales de Prueba

**Usuario Admin:**
- Username: `admin`
- Password: `123456`

**Usuario Cliente:**
- Email: `cliente@pasteleria.com`
- Password: `cliente123`

## 🔐 Flujo de Autenticación

1. Usuario hace login en el frontend
2. Frontend envía credenciales a `POST /api/v1/auth/login`
3. Backend valida credenciales contra la base de datos
4. Backend responde con JWT token real
5. Frontend guarda el token en localStorage
6. Frontend incluye el token en todas las peticiones subsecuentes
7. Backend valida el token JWT en cada petición protegida

## 📊 Endpoints Disponibles

Ver archivo `API_ENDPOINTS.md` para la lista completa de endpoints.

## 🎯 Diferencias Principales

| Frontend Anterior | Con Backend Real |
|------------------|------------------|
| localStorage para productos | Base de datos MySQL |
| localStorage para usuarios | Base de datos con bcrypt |
| Token simulado | JWT real |
| Validación en cliente | Validación en servidor |
| Datos hardcodeados | CRUD completo |

## 🔧 Variables de Entorno

El backend usa estas variables (ya configuradas en `.env`):

```env
DB_TYPE=mysql
DB_HOST=127.0.0.1
DB_PORT=3307
DB_USERNAME=root
DB_PASSWORD=
DB_NAME=pasteleria
JWT_SECRET=pasteleria_los_sabores_secret_key_2024_super_seguro
JWT_EXPIRES=1d
NODE_ENV=development
```
