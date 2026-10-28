# 📝 Gestor de Eventos

Esta aplicación web tiene la función para la gestión de eventos personales, con la posibilidad de poder gestionar los eventos con las siguientes acciones: Crear, Editar y Eliminar.
Acciones extras como: Marcar como Pendiente o Completado.

## 🎯 Características

- ✅ Organizar por medio de fechas (menor a mayor).
- ✅ Marcar Vencido automaticamente si no se completo y si la fecha ya esta pasado.
- ✅ Tener Varias Categorias de Filtrado de Eventos (Eventos Proximos, Vencidos, Completados, etc...)

## 🛠️ Tecnologías / Herramientas Utilizadas

### 🧪 Lenguajes & Entornos

- **JavaScript (Node.js)** - Lenguaje principal y entorno de ejecución.

  ### Backend & API

  - **Fastify** - Framework web enfocado en alto rendimiento para la creación de la API REST.
  - **JWT** - (JSON Web Tokens) para gestionar la autenticación y proteger las rutas de la API de forma segura y eficiente.

    #### - Base de Datos & ORM

    - **Prisma** - ORM para el modelado de datos, migraciones y consultas tipadas.
    - **PostgreSQL** - Sistema de gestión de base de datos relacional.

  ### Frontend

  - **React Vite** - Entorno de desarrollo rápido y moderno para aplicaciones web frontend.
  - **Axios** - Cliente HTTP basado en promesas para el navegador y Node.js. Se utiliza para realizar solicitudes de datos a API externas de forma sencilla, eficiente.
  - **React Bootstrap** - Framework de diseño Bootstrap utilizando componentes nativos de React.

### Infraestructura & Herramientas

- **Docker / Docker Compose** - Containerización de la base de datos PostgreSQL para entorno local.

## Estructura del Proyecto

        Mi-Gestor-Eventos/
        │
        ├── frontend/
        │   ├── src/
        │   │   ├── api/
        │   │   ├── assets/
        |   |   ├── components/ 
        |   |   ├── CSS/
        |   |   ├── pages/
        │   │   └── protecteds
        │   ├── .gitignore
        │   ├── index.html
        │   └── package.json
        │
        ├── backend/
        |   |── prisma/    
        │   ├── src/
        │   │   ├── routes/
        │   │   ├── controllers/
        │   │   └── services/
        │   ├── .env.example
        │   ├── .gitignore
        |   |── docker-compose.yml
        │   └── package.json
        │
        ├── .gitignore
        └── README.md

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO   
cd Gestor-de-Eventos
```

### 2. Configurar Backend

```bash
cd backend_gestor_eventos
npm install
```

### 3. Configurar Base de Datos

```bash
docker compose up -d

npx prisma generate
npx prisma migrate dev
npx prisma db seed
```

### 4. Ejecutar Backend

```bash
npm run dev
```

### 5. Configurar Frontend

```bash
cd frontend_gestor_eventos
npm install 
npm run dev
```

## Variables de Entorno

El proyecto utiliza variables de entorno para configurar las conexiones y credenciales necesarias.

### Backend

Crear un archivo `.env` dentro de `backend_gestor_eventos/`:

- Los datos se encuentran en el `docker-compose.yml`

```bash
DATABASE_URL="postgresql://[POSTGRES_USER]:[POSTGRES_PASSWORD]@localhost:3010/[POSTGRES_DB]"
JWT_SECRET="tu_secreto"
```

### Frontend

Crear un archivo `.env` dentro de `frontend_gestor_eventos/`:

```bash
VITE_API_URL=  [url_Backend]/api
```

## ---------------- Vista previa del Proyecto --------------------

![Gestor_Proyecto](./frontend_gestor_eventos/src/assets/CapturaProyecto.png)

## 📬 Contacto

**👤 Responsable:** Agustín López

**📧 Correo electrónico:** <agus77chang@gmail.com>  

**💻 Linkedin:** [Agustin Lopez](www.linkedin.com/in/agustín-lópez-886426386)
