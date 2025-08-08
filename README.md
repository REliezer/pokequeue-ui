# 🎮 PokeQueue UI

**PokeQueue UI** es una aplicación web moderna construida con Next.js que permite generar, gestionar y descargar reportes de Pokémon por tipo. La interfaz proporciona una experiencia de usuario intuitiva para interactuar con la PokeAPI y manejar reportes de datos de manera eficiente.

## 🏗️ Arquitectura del Sistema PokeQueue

Este repositorio es parte de un ecosistema completo de microservicios para el procesamiento de reportes de Pokémon. El sistema completo está compuesto por los siguientes componentes:

### 🔗 Repositorios Relacionados

| Componente | Repositorio | Descripción |
|------------|-------------|-------------|
| **Frontend** | [PokeQueue UI](https://github.com/REliezer/pokequeue-ui) | Este repositorio - Interfaz de usuario web para solicitar y gestionar reportes de Pokémon |
| **API REST** | [PokeQueue API](https://github.com/REliezer/pokequeueAPI) | API principal que gestiona solicitudes de reportes y coordinación del sistema |
| **Azure Functions** | [PokeQueue Functions](https://github.com/REliezer/pokequeue-function) | Procesamiento asíncrono de reportes |
| **Base de Datos** | [PokeQueue SQL Scripts](https://github.com/REliezer/pokequeue-sql) | Scripts SQL para la configuración y mantenimiento de la base de datos |
| **Infraestructura** | [PokeQueue Terraform](https://github.com/REliezer/pokequeue-terrafom) | Configuración de infraestructura como código (IaC) |

### 🔄 Flujo de Datos del Sistema Completo

1. **PokeQueue UI** *(este repo)* → Usuario solicita reporte desde la interfaz web
2. **PokeQueue UI** → Envía solicitud a **PokeQueue API**
3. **PokeQueue API** → Valida la solicitud y la guarda en la base de datos
4. **PokeQueue API** → Envía mensaje a la cola de Azure Storage
5. **PokeQueue Function** → Procesa el mensaje de la cola
6. **PokeQueue Function** → Consulta PokéAPI y genera el reporte CSV
7. **PokeQueue Function** → Almacena el CSV en Azure Blob Storage
8. **PokeQueue Function** → Notifica el estado a **PokeQueue API**
9. **PokeQueue UI** → Consulta el estado y permite descargar el reporte terminado

### 🏗️ Diagrama de Arquitectura

```
   ┌─────────────────┐
   │   PokeQueue UI  │
   │ (Frontend Web)  │
   └─────────┼───────┘
             │
             ▼ HTTP/REST
  ┌─────────────────┐    ┌─────────────────┐
  │  PokeQueue API  │────│   Azure SQL DB  │
  │   (REST API)    │    │  (Persistencia) │
  └─────────┼───────┘    └─────────────────┘
            │
            ▼ Queue Message
   ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
   │  Azure Storage  │────│ PokeQueue Func  │────│   Azure Blob    │
   │     Queue       │    │ (Procesamiento) │    │    Storage      │
   └─────────────────┘    └─────────┼───────┘    └─────────────────┘
                                    │
                                    ▼ HTTP API Call
                           ┌─────────────────┐
                           │    PokéAPI      │
                           │ (Datos Pokémon) │
                           └─────────────────┘
```

## ✨ Características

- 🚀 **Interfaz moderna** construida con Next.js 15 y React 19
- 🎨 **Diseño responsive** con Tailwind CSS 4 y componentes reutilizables
- 📊 **Generación de reportes** por tipo de Pokémon con tamaño de muestra personalizable
- 📋 **Gestión completa de reportes** con estados en tiempo real
- 📥 **Descarga de archivos CSV** para reportes completados
- 🗑️ **Eliminación segura** de reportes con confirmación
- 📄 **Paginación inteligente** mostrando 10 reportes por página
- 🔄 **Actualización automática** del estado de los reportes
- 📱 **Diseño responsive** optimizado para todos los dispositivos
- 🎯 **Notificaciones interactivas** con Sonner
- ⚡ **Rendimiento optimizado** con componentes de carga y estados

## 🛠️ Tecnologías

- **Framework**: [Next.js 15](https://nextjs.org/) con App Router
- **React**: v19.1.1 con Hooks modernos
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Componentes UI**: 
  - [Radix UI](https://www.radix-ui.com/) para componentes accesibles
  - [Lucide React](https://lucide.dev/) para iconografía
  - Componentes personalizados con [shadcn/ui](https://ui.shadcn.com/) design system
- **Notificaciones**: [Sonner](https://sonner.emilkowal.ski/)
- **Utilidades**: [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- **TypeScript**: Compatible (configuración JSX)

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 18.0 o superior)
- **npm**, **yarn**, **pnpm** o **bun** como gestor de paquetes

## 🚀 Instalación y Configuración

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/REliezer/pokequeue-ui
   cd pokequeue-ui
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   # o
   bun install
   ```

3. **Configura las variables de entorno** (opcional):
   
   El archivo `src/lib/settings.js` contiene la URL de la API:
   ```javascript
   export default {
       URL: "https://api-pokequeue-refe-dev.azurewebsites.net",
   };
   ```
   
   Puedes modificar esta URL según tu entorno de desarrollo.

4. **Ejecuta el servidor de desarrollo**:
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   # o
   bun dev
   ```

5. **Abre la aplicación**:
   
   Navega a [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📂 Estructura del Proyecto

```
pokequeue-ui/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── layout.js          # Layout principal
│   │   └── page.js            # Página principal
│   ├── components/            # Componentes React
│   │   ├── ui/                # Componentes UI reutilizables
│   │   │   ├── button.jsx
│   │   │   ├── table.jsx
│   │   │   ├── pagination.jsx  # ✨ Componente de paginación
│   │   │   └── ...
│   │   ├── pokemon-type-selector.jsx
│   │   └── reports-table.jsx   # 📊 Tabla principal con paginación
│   ├── lib/                   # Utilidades y configuración
│   │   ├── settings.js        # Configuración de la API
│   │   └── utils.js
│   └── services/              # Servicios de API
│       ├── pokemon-service.js
│       └── report-service.js
├── public/                    # Archivos estáticos
├── components.json           # Configuración de componentes
├── tailwind.config.js        # Configuración de Tailwind
├── next.config.mjs           # Configuración de Next.js
└── package.json
```

## 🎯 Uso de la Aplicación

### Generar un Nuevo Reporte

1. **Selecciona un tipo de Pokémon** del dropdown
2. **Especifica el tamaño de muestra** (número máximo de registros, es opcional)
3. **Haz clic en "Catch them all!"** para generar el reporte
4. El reporte aparecerá en la tabla con estado "Sent" o "InProgress"

### Gestionar Reportes Existentes

- **📊 Ver todos los reportes**: La tabla muestra todos los reportes con paginación (10 por página)
- **🔄 Refrescar**: Usa el botón "Refresh" para actualizar el estado de los reportes
- **📥 Descargar**: Los reportes "Completed" tienen un botón de descarga para obtener el CSV
- **🗑️ Eliminar**: Los reportes "Completed" o "Failed" pueden ser eliminados
- **🔀 Ordenar**: Cambia entre ordenamiento ascendente/descendente por fecha

### Estados de Reportes

- 🟦 **Sent**: Reporte enviado a procesamiento
- 🟨 **InProgress**: Reporte en proceso de generación
- 🟩 **Completed**: Reporte completado y listo para descarga
- 🟥 **Failed**: Reporte falló durante el procesamiento

## 📦 Scripts Disponibles

- `npm run dev` - Ejecuta el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Ejecuta la aplicación en modo producción
- `npm run lint` - Ejecuta el linter para revisar el código

## 🔧 Configuración de Desarrollo

### Personalizar Componentes UI

Los componentes UI están basados en el design system de shadcn/ui y se encuentran en `src/components/ui/`. Puedes personalizarlos según las necesidades del proyecto.

### Modificar la Paginación

Para cambiar el número de elementos por página, modifica la constante `itemsPerPage` en `src/components/reports-table.jsx`:

```javascript
const [itemsPerPage] = useState(10); // Cambia este valor
```

### API Endpoints

La aplicación consume los siguientes endpoints:

- `GET /api/request` - Obtener lista de reportes
- `POST /api/request` - Crear nuevo reporte
- `DELETE /api/report/{id}` - Eliminar reporte
- `GET /api/pokemon/types` - Obtener tipos de Pokémon

## 🚀 Instalación Completa del Sistema PokeQueue

Para desplegar el sistema completo, necesitas configurar todos los componentes en el siguiente orden:

### 1. Infraestructura (Terraform)
```bash
# Clonar el repositorio de infraestructura
git clone https://github.com/REliezer/pokequeue-terrafom.git
cd pokequeue-terrafom

# Configurar variables de Terraform
terraform init
terraform plan
terraform apply
```

### 2. Base de Datos (SQL Scripts)
```bash
# Clonar el repositorio de base de datos
git clone https://github.com/REliezer/pokequeue-sql.git
cd pokequeue-sql

# Ejecutar scripts SQL en Azure SQL Database
# (Revisar el README del repositorio SQL para instrucciones específicas)
```

### 3. API REST
```bash
# Clonar y desplegar la API
git clone https://github.com/REliezer/pokequeueAPI.git
cd pokequeueAPI

# Seguir las instrucciones del README de la API
```

### 4. Azure Functions
```bash
# Clonar este repositorio
git clone https://github.com/REliezer/pokequeue-function.git
cd pokequeue-function

# Seguir las instrucciones del README para configuración y despliegue
```

### 5. Frontend UI (Este Repositorio)
```bash
# Clonar y desplegar el frontend
git clone https://github.com/REliezer/pokequeue-ui.git
cd pokequeue-ui

# Seguir las instrucciones de despliegue
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es parte de un trabajo académico para Sistemas Expertos II PAC 2025.