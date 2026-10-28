# 📝 Gestor de Eventos (backend)

Esta aplicación web tiene la función para la gestión de eventos personales, con la posibilidad de poder gestionar los eventos con las siguientes acciones: Crear, Editar y Eliminar.
Acciones extras como marcar como Pendiente o Completado.

## 🎯 Características

- ✅ Organizar por medio de fechas (menor a mayor).
- ✅ Marcar Vencido automaticamente si no se completo y la fecha ya esta pasado.
- ✅ Tener Varias Categorias de Filtrado de Eventos (Eventos Proximos, Vencidos, Completados, etc...)

## 🛠️ Tecnologías / Herramientas Utilizadas

### 🧪 Lenguajes & Entornos

- **TypeScript** → Lenguaje principal utilizado para desarrollar el backend.

  ### Backend & API

  - **Fastify** - Framework web enfocado en alto rendimiento para la creación de la API REST.
  - **JWT** - (JSON Web Tokens) para gestionar la autenticación y proteger las rutas de la API de forma segura y eficiente.
  - **bcrypt** - Hash seguro de contraseñas antes de almacenarlas.

    #### - Base de Datos & ORM

    - **Prisma** - ORM para el modelado de datos, migraciones y consultas tipadas.
    - **PostgreSQL** - Sistema de gestión de base de datos relacional.

### Infraestructura & Herramientas

- **Docker / Docker Compose** - Containerización de la base de datos PostgreSQL para entorno local.

## Estructura del Proyecto

        Mi-Gestor-Eventos/
        │
        ├── frontend/
        │   └── ...
        │
        ├── backend/
        |   |── prisma/ : Configuración del ORM Prisma, esquema de la base de datos y migraciones.    
        │   ├── src/
        │   │   ├── common/ : Recursos y configuraciones compartidas entre diferentes módulos.
        |   |   |   |── AppError.ts : Clase personalizada para manejar errores controlados de la aplicación.
        |   |   |   |── error.handler.ts : Manejador global de errores encargado de procesar y responder ante errores.
        |   |   |   └── roles.middleware.ts : Middleware encargado de validar los roles y permisos de acceso de los usuarios.
        |   |   |
        |   |   ├── helpers/ : Funciones auxiliares reutilizables para distintas partes de la aplicación.
        │   │   ├── modules/ 
        |   |   |   |── controllers/ : Funcionalidades de control y administración.
        |   |   |   |── events/ : Gestión de eventos.
        |   |   |   |── login/ : Autenticación de usuarios.
        |   |   |   └── users/ : Gestión de usuarios.
        |   |   |
        |   |   ├── plugins/
        |   |   |   |── jwt.ts : Configuración y manejo de la autenticación mediante JSON Web Tokens (JWT).
        |   |   |   └── prisma.ts : Configuración e inicialización del cliente de Prisma para interactuar con la base de datos.
        |   |   |
        │   │   └── types/ : Definiciones y declaraciones de tipos utilizadas en el proyecto
        │   ├── app.ts : Configuración y creación de la aplicación Fastify.
        │   ├── server.ts : Punto de entrada que inicia el servidor y escucha las peticiones.
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

## Variables de Entorno

El proyecto utiliza variables de entorno para configurar las conexiones y credenciales necesarias.

### Backend

Crear un archivo `.env` dentro de `backend_gestor_eventos/`:

- Los datos se encuentran en el `docker-compose.yml`

```bash
DATABASE_URL="postgresql://[POSTGRES_USER]:[POSTGRES_PASSWORD]@localhost:3010/[POSTGRES_DB]"
JWT_SECRET="tu_secreto"
```

## 🌐 API Gestor de Eventos

## 🔗 Endpoints

### 1 Hacer Login 

- **URL:** `/api/login`
- **Autenticado:** `No`
- **Método:** `POST`
- **Body:** `json =>`

```json
{
    "email":"admin@gmail.com",
    "password":"Admin1234"
}
```

- **Respuesta Exitosa 200 :** *json  =>*

```json
{
    "message": "Acceso Exitoso",
    "status": 200,
    "user": {
        "name": "Admin"
    },
    "token":"TOKEN_JWT"
}
```

- **Respuesta Error 401:** *json  =>*

```json
{
    "message": "Usuario o Contraseña inválidos",
    "status": 401
}
```

### 2 CRUD Eventos

---
-- Crear Eventos --

- **Autenticado:** `Si`
- **URL:** `/api/events`
- **Método:** `POST`
- **Body:** `json =>`

```json
{
    "title": "Flores Amarillas",
    "description": "Regalar a mi ex Flores amarillas",
    "date": "2026-09-21T06:00:00.000Z",
    "time": "14:00",
    "place": "Casa Regional",
    "status": "Pendiente"
}
```

- **Respuesta Exitosa 200 :** *json  =>*

```json
{
    "message": "Evento Creado",
    "status": 200,
    "evento": {
        "id": "944a761f-5c35-47e8-9628-1c6b97d91952",
        "title": "Flores Amarillas",
        "description": "Regalar a mi ex Flores amarillas",
        "date": "2026-09-21T06:00:00.000Z",
        "time": "14:00",
        "place": "Casa Regional",
        "status": "Pendiente",
        "userId": "f2f2dc3f-f1bb-46f2-aa85-775efff0284d"
    }
}
```

- **Respuesta Error 400, Errores de validaciones:** *=>*

    Campos:

        title: Campo obligatorio
        description: Campo Opcional
        date: Campo Obligatorio DateTime (ej. "2026-09-23T09:00:00.000Z" )
        time: Campo Obligatorio 
        place: Campo Opcional
        status: Campo Obligatorio

---
-- Obtener todos los eventos --

- **Autenticado:** Si
- **URL:** `/api/events`
- **Método:** `GET`
- **Query Parameters (opcional) =>**

        date: Fecha a consultar (YYYY-MM-DD)
        filtOptions: Filtros de Eventos =>
            - todos los eventos
            - eventos proximos
            - eventos completados
            - eventos pendientes
            - eventos vencidos
        page: pagina a actual
        limit: Cantidad máxima de resultados
- **Respuesta Exitosa 200 :** *json  =>*

```json
{
    "message": "Todos los Eventos",
    "status": 200,
    "results": {
        "eventos": [
            {
                "id": "86d01879-3136-44d0-ab51-8ee87a033ffd",
                "title": "Dar de Comer al Perro",
                "description": "Dani come a las 2 de la tarde",
                "date": "2026-09-22T06:00:00.000Z",
                "time": "14:00",
                "place": "Casa",
                "status": "Pendiente",
                "userId": "f2f2dc3f-f1bb-46f2-aa85-775efff0284d"
            },
            {"..."}
        ],
        "pagination": {
            "page": 1,
            "limit": 15,
            "total": 15,
            "totalPaginas": 1
        }
    }
}
```

- **Respuesta Error 500:** *json  =>*

```json
{
    "message": "Error interno en el servidor",
    "status": 500
}
```

---

-- Obtener un evento  --

- **Autenticado:** Si
- **URL:** `/api/events/id`
- **Método:** `GET`
- **Respuesta Exitosa 200 :** *json  =>*

```json
{
    "message": "Evento Encontrado",
    "status": 200,
    "evento": {
        "id": "944a761f-5c35-47e8-9628-1c6b97d91952",
        "title": "Blados",
        "description": "Regalar a mi ex Flores amarillas",
        "date": "2026-12-05T00:00:00.000Z",
        "time": "10:31",
        "place": "Casa Regional",
        "status": "Pendiente",
        "userId": "f2f2dc3f-f1bb-46f2-aa85-775efff0284d"
    }
}
```

- **Respuesta Error 404:** *json  =>*

```json
{
    "message": "Evento no Encontrado",
    "status": 404
}
```

---

-- Actualizar un evento  --

- **Autenticado:** Si
- **URL:** `/api/events/id`
- **Método:** `PUT`
- **Body:** `json =>`

```json
{
    "title": "Flores Nuevas",
    "description": "Comprar Flores Rojas",
    "date": "2026-12-09T00:00:00.000Z",
    "time": "10:31",
    "place": "Casa Regional 2",
    "status": "Completado"
}
```

- **Respuesta Exitosa 200 :** *json  =>*

```json
{
    "message": "Evento Actualizado Correctamente",
    "status": 200,
    "evento": {
        "id": "944a761f-5c35-47e8-9628-1c6b97d91952",
        "title": "Flores Nuevas",
        "description": "Comprar Flores Rojas",
        "date": "2026-12-09T00:00:00.000Z",
        "time": "10:31",
        "place": "Casa Regional 2",
        "status": "Completado",
        "userId": "f2f2dc3f-f1bb-46f2-aa85-775efff0284d"
    }
}
```

- **Respuesta Error 404:** *json  =>*

```json
{
    "message": "Evento no Actualizado",
    "status": 404
}
```

---

-- Marcar como Completado/Pendiente un evento  --

- **Autenticado:** Si
- **URL:** `/api/events/id`
- **Método:** `PATCH`
- **Body:** `json =>`

```json
{
    "status": "Pendiente"
}
```

- **Respuesta Exitosa 200 :** *json  =>*

```json
{
    "message": "Evento marcado como Pendiente",
    "status": 200,
    "evento": {
        "id": "944a761f-5c35-47e8-9628-1c6b97d91952",
        "title": "Flores Nuevas",
        "description": "Comprar Flores Rojas",
        "date": "2026-12-09T00:00:00.000Z",
        "time": "10:31",
        "place": "Casa Regional 2",
        "status": "Completado",
        "userId": "f2f2dc3f-f1bb-46f2-aa85-775efff0284d"
    }
}
```

- **Respuesta Error 404:** *json  =>*

    Validación: Acepta solo dos valores =>  **Completado o Pendiente**

```json
{
    "message": "Evento no Actualizado",
    "status": 404
}
```

---

-- Eliminar un Evento  --

- **Autenticado:** Si
- **URL:** `/api/events/id`
- **Método:** `DELETE`

- **Respuesta Exitosa 200 :** *json  =>*

```json
{
    "message": "Evento Eliminado",
    "status": 200,
    "evento": {
        "id": "944a761f-5c35-47e8-9628-1c6b97d91952",
        "title": "Flores Nuevas",
        "description": "Comprar Flores Rojas",
        "date": "2026-12-09T00:00:00.000Z",
        "time": "10:31",
        "place": "Casa Regional 2",
        "status": "Pendiente",
        "userId": "f2f2dc3f-f1bb-46f2-aa85-775efff0284d"
    }
}
```

- **Respuesta Error 404:** *json  =>*

```json
{
    "message": "Evento no Eliminado",
    "status": 404
}
```

---

## ---------------- Vista previa del Proyecto --------------------

![Gestor_Proyecto](../frontend_gestor_eventos/src/assets/CapturaProyecto.png)

## 📬 Contacto

**👤 Responsable:** Agustín López

**📧 Correo electrónico:** <agus77chang@gmail.com>  

**💻 Linkedin:** [Agustin Lopez](www.linkedin.com/in/agustín-lópez-886426386)
