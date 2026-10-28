# 📝 Gestor de Eventos (frontend)

Esta aplicación web tiene la función para la gestión de eventos personales, con la posibilidad de poder gestionar los eventos con las siguientes acciones: Crear, Editar y Eliminar.
Acciones extras como marcar como Pendiente o Completado.

## 🎯 Características

- ✅ Organizar por medio de fechas (menor a mayor).
- ✅ Marcar Vencido automaticamente si no se completo y la fecha ya esta pasado.
- ✅ Tener Varias Categorias de Filtrado de Eventos (Eventos Proximos, Vencidos, Completados, etc...)

## 🛠️ Tecnologías / Herramientas Utilizadas

### 🧪 Lenguajes & Entornos

- **JavaScript (Node.js)** - Lenguaje principal y entorno de ejecución.

  ### Frontend

  - **React Vite** - Entorno de desarrollo rápido y moderno para aplicaciones web frontend.
  - **Axios** - Cliente HTTP basado en promesas para el navegador y Node.js. Se utiliza para realizar solicitudes de datos a API externas de forma sencilla, eficiente.
  - **React Bootstrap** - Framework de diseño Bootstrap utilizando componentes nativos de React.

## Estructura del Proyecto

        Mi-Gestor-Eventos/
        │
        ├── frontend/
        │   ├── src/
        │   │   ├── api/ : Contiene la configuración e instancia global de Axios (URL base, interceptores).
        │   │   ├── assets/
        |   |   ├── components/ : La lógica de las peticiones HTTP (como la creación o actualización de eventos) se maneja directamente dentro de los componentes correspondientes.
        |   |   ├── css/
        |   |   ├── pages/ : Vistas generales de la aplicación.
        │   │   └── guards/ : Configuración de componentes de protección
        │   ├── .gitignore
        │   ├── index.html
        │   └── package.json
        │
        ├── backend/
        └── ...

## Instalación y Ejecución

### 1. Clonar el repositorio

```bash
git clone URL_DEL_REPOSITORIO   
cd Gestor-de-Eventos
```

### 2. Configurar Frontend

```bash
cd frontend_gestor_eventos
npm install 
npm run dev
```

## Variables de Entorno

El proyecto utiliza variables de entorno para configurar las conexiones y credenciales necesarias.

### Frontend

Crear un archivo `.env` dentro de `frontend_gestor_eventos/`:

```bash
VITE_API_URL=  [url_Backend]/api
```

## ---------------- Vista previa del Proyecto --------------------

![Gestor_Proyecto](./src/assets/CapturaProyecto.png)

## 📬 Contacto

**👤 Responsable:** Agustín López

**📧 Correo electrónico:** <agus77chang@gmail.com>

**💻 Linkedin:** [Agustin Lopez](www.linkedin.com/in/agustín-lópez-886426386)
