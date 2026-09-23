# QUORUM

Sistema de software desarrollado para la gestión y operación de **QUORUM**.

El proyecto está dividido en dos partes principales:

* **Frontend:** Interfaz de usuario de la aplicación.
* **Backend:** API y lógica de negocio desarrollada con Laravel.

---

## 📁 Estructura del proyecto

```text
QUORUM/
│
├── Frontend/
│   └── ...
│
├── Backend/
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── public/
│   ├── resources/
│   ├── routes/
│   ├── storage/
│   ├── artisan
│   └── composer.json
│
├── BACKEND_README.md
├── FRONTEND_README.md
├── QUORUM_DOCKER_SETUP.md
└── README.md
```

---

# 🚀 Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/TU-USUARIO/QUORUM.git
```

Entrar al proyecto:

```bash
cd QUORUM
```

---

# ⚙️ Backend

El backend está desarrollado utilizando **Laravel**.

### Requisitos

Antes de comenzar, asegúrate de tener instalado:

* PHP
* Composer
* Laravel
* Base de datos utilizada por el proyecto
* Git

### Instalar dependencias

Entrar a la carpeta del backend:

```bash
cd Backend
```

Instalar las dependencias de Composer:

```bash
composer install
```

### Configurar variables de entorno

Copiar el archivo de configuración:

```bash
cp .env.example .env
```

En Windows PowerShell también puedes utilizar:

```powershell
Copy-Item .env.example .env
```

Generar la clave de Laravel:

```bash
php artisan key:generate
```

### Configurar la base de datos

Abrir el archivo:

```text
Backend/.env
```

Configurar los datos correspondientes a la base de datos:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=quorum
DB_USERNAME=root
DB_PASSWORD=
```

> Los valores anteriores son solamente un ejemplo. Utiliza las credenciales correspondientes a tu entorno local.

Ejecutar las migraciones:

```bash
php artisan migrate
```

Si el proyecto utiliza seeders:

```bash
php artisan db:seed
```

O ambos:

```bash
php artisan migrate --seed
```

### Ejecutar el backend

```bash
php artisan serve
```

Por defecto, Laravel estará disponible en:

```text
http://127.0.0.1:8000
```

---

# 🖥️ Frontend

El frontend se encuentra dentro de:

```text
Frontend/
```

### Requisitos

* Node.js
* npm

### Instalar dependencias

Desde la carpeta `Frontend`:

```bash
cd Frontend
```

Instalar dependencias:

```bash
npm install
```

### Ejecutar el frontend

```bash
npm start
```

o, dependiendo de la tecnología utilizada:

```bash
npm run dev
```

La dirección dependerá de la configuración del proyecto.

---

# 🌿 Flujo de trabajo con Git

Para mantener organizado el desarrollo del equipo, **no se recomienda trabajar directamente sobre `main`**.

Cada integrante debe crear una rama para su trabajo.

### Crear una rama

```bash
git checkout -b feature/nombre-de-la-funcionalidad
```

Ejemplo:

```bash
git checkout -b feature/login
```

### Guardar cambios

```bash
git add .
git commit -m "Agregar sistema de login"
```

### Subir la rama

```bash
git push -u origin feature/login
```

Posteriormente se puede crear un **Pull Request** hacia `main`.

---

# 📌 Convención de ramas

Se recomienda utilizar los siguientes prefijos:

```text
feature/    Nuevas funcionalidades
fix/        Corrección de errores
refactor/   Refactorización de código
docs/       Documentación
test/       Pruebas
```

Ejemplos:

```text
feature/login
feature/dashboard
feature/user-management
fix/login-validation
fix/database-connection
refactor/authentication
docs/api
```

---

# 📝 Convención de commits

Los commits deben describir claramente el cambio realizado.

Ejemplos:

```text
feat: agregar inicio de sesión
feat: agregar módulo de usuarios
fix: corregir validación de contraseña
fix: solucionar error en consulta de usuarios
refactor: reorganizar servicios de autenticación
docs: actualizar README
test: agregar pruebas para login
```

---

# 🔐 Variables de entorno

**No subir información sensible al repositorio.**

No se deben subir archivos como:

```text
.env
.env.production
```

Las credenciales, contraseñas, tokens y claves deben mantenerse únicamente en el entorno local o en el sistema de configuración correspondiente.

Cada integrante debe crear su propio:

```text
.env
```

utilizando:

```text
.env.example
```

como referencia.

---

# 👥 Desarrollo en equipo

El proyecto está pensado para dividir el trabajo entre diferentes áreas.

### Frontend

Responsable principalmente de:

* Interfaces
* Componentes
* Formularios
* Navegación
* Consumo de la API
* Validaciones del lado del cliente

Ubicación:

```text
Frontend/
```

### Backend

Responsable principalmente de:

* API
* Modelos
* Controladores
* Migraciones
* Autenticación
* Reglas de negocio
* Acceso a base de datos

Ubicación:

```text
Backend/
```

---

# 🔄 Actualizar el proyecto

Antes de comenzar a trabajar:

```bash
git checkout main
git pull origin main
```

Después crea tu rama:

```bash
git checkout -b feature/mi-funcionalidad
```

Al terminar:

```bash
git add .
git commit -m "feat: descripción del cambio"
git push -u origin feature/mi-funcionalidad
```

Finalmente, crea un Pull Request hacia `main`.

---

# 🧪 Pruebas

Antes de realizar un Pull Request se recomienda verificar:

* El proyecto compila correctamente.
* Las pruebas existentes pasan correctamente.
* No existen errores en consola.
* Las migraciones funcionan correctamente.
* El frontend puede comunicarse con el backend.
* No se incluyen credenciales o información sensible.
* El código mantiene la estructura existente del proyecto.

---

# 📚 Tecnologías

## Backend

* Laravel
* PHP
* Composer
* Base de datos

## Frontend

* JavaScript / TypeScript
* Node.js
* npm
* Framework frontend utilizado por el proyecto

---

# 📄 Licencia

Este proyecto es de uso privado.

La distribución, modificación o utilización del código queda sujeta a las condiciones establecidas por los propietarios del proyecto.
