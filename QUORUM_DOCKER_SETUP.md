# QUORUM — Guía de instalación y ejecución con Docker

Esta guía está pensada para integrantes del equipo que ya recibieron **todos los archivos actualizados del proyecto QUORUM**.

Los archivos de Docker, configuración del frontend, backend, proxy de Vite, Laravel, Sanctum y demás cambios del proyecto **ya deben venir incluidos**. Por lo tanto, **no es necesario volver a crear Dockerfiles, `compose.yaml`, `vite.config.ts`, configuración CORS ni archivos del sistema administrativo**.

El objetivo es únicamente preparar el entorno local y levantar el proyecto correctamente.

---

## 1. Requisitos

Solo necesitas tener instalado:

- **Docker Desktop**

No necesitas instalar:

- XAMPP
- PHP
- Composer
- MySQL
- Node.js
- npm
- Adminer

Docker ejecutará todos esos servicios dentro de contenedores.

Antes de continuar, abre Docker Desktop y espera hasta que indique:

```text
Engine running
```

---

## 2. Verificar la estructura del proyecto

La carpeta principal debe verse aproximadamente así:

```text
QUORUM/
│
├── Backend/
│   ├── app/
│   ├── bootstrap/
│   ├── config/
│   ├── database/
│   ├── routes/
│   ├── Dockerfile
│   ├── composer.json
│   ├── .env.example
│   └── ...
│
├── Frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   ├── vite.config.ts
│   └── ...
│
└── compose.yaml
```

Si `compose.yaml`, los Dockerfiles o `vite.config.ts` no existen, confirma que tienes la versión más reciente del proyecto antes de continuar.

---

## 3. Crear el archivo `.env` de Laravel

Laravel necesita un archivo local llamado:

```text
Backend/.env
```

Este archivo normalmente no se comparte porque contiene información local y secretos.

### En Windows PowerShell

Desde la carpeta principal de QUORUM:

```powershell
Copy-Item ".\Backend\.env.example" ".\Backend\.env"
```

Si el archivo `.env` ya existe, **no lo reemplaces**.

---

## 4. Verificar la configuración importante del `.env`

Abre:

```text
Backend/.env
```

La configuración principal debe usar estos valores:

```env
APP_NAME=QUORUM
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8001

FRONTEND_URL=http://localhost:5174

DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=quorum
DB_USERNAME=quorum
DB_PASSWORD=quorum_dev

SESSION_DRIVER=file
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=
SESSION_SECURE_COOKIE=false
SESSION_SAME_SITE=lax

SANCTUM_STATEFUL_DOMAINS=localhost:5174,127.0.0.1:5174

CACHE_STORE=file
```

### Importante

Dentro de Docker, la base de datos se llama:

```text
db
```

Por eso debe usarse:

```env
DB_HOST=db
```

No cambies ese valor a `localhost` ni `127.0.0.1`.

---

## 5. Construir e iniciar QUORUM por primera vez

Desde la carpeta principal del proyecto:

```powershell
docker compose -p quorum up -d --build
```

La primera ejecución puede tardar varios minutos.

Docker preparará automáticamente:

- Frontend React
- Backend Laravel
- PHP
- Composer
- Node.js
- npm
- MySQL
- Adminer

No cierres Docker Desktop mientras termina este proceso.

---

## 6. Verificar los contenedores

Ejecuta:

```powershell
docker compose -p quorum ps
```

Deben aparecer estos servicios:

```text
frontend
backend
db
adminer
```

El servicio de base de datos debe terminar mostrando un estado similar a:

```text
healthy
```

---

## 7. Generar la clave de Laravel

Solo es necesario cuando el `.env` todavía tiene:

```env
APP_KEY=
```

Ejecuta:

```powershell
docker compose -p quorum exec backend php artisan key:generate
```

Debe aparecer:

```text
INFO  Application key set successfully.
```

Laravel colocará automáticamente una clave en:

```env
APP_KEY=base64:...
```

No compartas esa clave públicamente.

---

## 8. Limpiar la configuración de Laravel

Después de generar la clave:

```powershell
docker compose -p quorum exec backend php artisan config:clear
```

Luego:

```powershell
docker compose -p quorum exec backend php artisan cache:clear
```

---

## 9. Crear las tablas de la base de datos

Ejecuta:

```powershell
docker compose -p quorum exec backend php artisan migrate
```

Para comprobarlas:

```powershell
docker compose -p quorum exec backend php artisan migrate:status
```

Las migraciones deben aparecer como:

```text
Ran
```

y no como:

```text
Pending
```

---

## 10. Crear el administrador local de prueba

Si el proyecto todavía no cuenta con un Seeder automático para el administrador, créalo manualmente.

Ejecuta:

```powershell
docker compose -p quorum exec backend php artisan tinker
```

Dentro de Tinker pega:

```php
$user = App\Models\User::updateOrCreate(
    ['email' => 'admin@quorum.com'],
    [
        'name' => 'Admin QUORUM',
        'password' => Illuminate\Support\Facades\Hash::make('Admin123!'),
        'role' => 'admin',
    ]
);
```

Verifica el rol:

```php
$user->role;
```

Debe devolver:

```text
"admin"
```

Verifica la contraseña:

```php
Illuminate\Support\Facades\Hash::check('Admin123!', $user->password);
```

Debe devolver:

```text
true
```

Para salir:

```php
exit
```

Credenciales locales de prueba:

```text
Correo:     admin@quorum.com
Contraseña: Admin123!
```

Estas credenciales son solamente para desarrollo local.

---

## 11. Direcciones del proyecto

### Frontend

```text
http://localhost:5174
```

### Login administrativo

```text
http://localhost:5174/admin/login
```

### Backend Laravel

```text
http://localhost:8001
```

### Adminer

```text
http://localhost:8082
```

### MySQL desde Windows

```text
localhost:3307
```

### MySQL desde los contenedores

```text
db:3306
```

---

## 12. Entrar a Adminer

Abre:

```text
http://localhost:8082
```

Usa:

```text
Sistema:       MySQL
Servidor:      db
Usuario:       quorum
Contraseña:    quorum_dev
Base de datos: quorum
```

En Adminer debes usar `db` como servidor.

---

## 13. Uso diario

Después de completar la instalación inicial, normalmente **ya no necesitas PowerShell para iniciar QUORUM**.

Haz lo siguiente:

1. Abre Docker Desktop.
2. Espera a que indique `Engine running`.
3. Busca el proyecto **quorum**.
4. Presiona el botón **Play ▶**.
5. Espera unos segundos.
6. Abre el frontend desde Docker Desktop o entra manualmente a:

```text
http://localhost:5174
```

Docker iniciará automáticamente React, Laravel, MySQL y Adminer.

No necesitas ejecutar `npm run dev`, `php artisan serve` ni iniciar XAMPP.

---

## 14. Detener el proyecto

En Docker Desktop:

1. Busca `quorum`.
2. Presiona **Stop ■**.

Esto solamente apaga los contenedores. No elimina usuarios, base de datos, configuración, archivos ni dependencias.

---

## 15. No eliminar los volúmenes

La base de datos local se guarda en un volumen de Docker.

Evita usar:

```powershell
docker compose down -v
```

porque `-v` puede eliminar la base de datos local.

También evita:

```powershell
docker system prune --volumes
```

si no sabes exactamente qué se eliminará.

---

## 16. Si aparece un error de `APP_KEY`

Si Laravel muestra:

```text
No application encryption key has been specified.
```

verifica que `Backend/.env` contenga:

```env
APP_KEY=base64:...
```

Si está vacío:

```powershell
docker compose -p quorum exec backend php artisan key:generate
```

Después:

```powershell
docker compose -p quorum exec backend php artisan config:clear
```

---

## 17. Si Laravel no puede conectarse a MySQL

Verifica que el `.env` contenga exactamente:

```env
DB_CONNECTION=mysql
DB_HOST=db
DB_PORT=3306
DB_DATABASE=quorum
DB_USERNAME=quorum
DB_PASSWORD=quorum_dev
```

Para probar la conexión:

```powershell
docker compose -p quorum exec backend php artisan tinker
```

Dentro:

```php
DB::connection()->getPdo();
```

Si funciona, debe mostrar información de PDO y una conexión similar a:

```text
CONNECTION_STATUS: "db via TCP/IP"
```

Después:

```php
exit
```

---

## 18. Si aparece “Correo o contraseña incorrectos”

Primero verifica que utilizas:

```text
Correo:     admin@quorum.com
Contraseña: Admin123!
```

Si la base de datos acaba de ser creada, probablemente falta realizar el paso de creación del administrador local.

---

## 19. Si aparece “No fue posible iniciar sesión”

Comprueba en Docker Desktop que estén activos:

```text
frontend    Running
backend     Running
db          Running / Healthy
adminer     Running
```

Después:

1. Abre el contenedor `backend`.
2. Abre la pestaña **Logs**.
3. Intenta iniciar sesión otra vez.
4. Revisa el error más reciente.

---

## 20. `localhost` y el proxy del frontend

El proyecto está preparado para funcionar principalmente desde:

```text
http://localhost:5174
```

El frontend utiliza un proxy de Vite para enviar al backend las peticiones:

```text
/api/*
/login
/logout
/sanctum/*
```

Usa preferentemente `http://localhost:5174` durante el desarrollo.

---

## 21. Si realizas cambios y no aparecen

Los archivos del proyecto están montados dentro de los contenedores.

En la mayoría de los casos los cambios en React, CSS, TypeScript, PHP y Laravel se detectan automáticamente.

Si el frontend no actualiza:

1. Abre Docker Desktop.
2. Detén únicamente `frontend`.
3. Vuelve a iniciarlo.

Si cambiaste un Dockerfile, `compose.yaml` o una configuración importante del contenedor, puede ser necesario reconstruirlo.

---

## 22. Puertos utilizados por QUORUM

| Servicio | Dirección |
|---|---|
| Frontend | `http://localhost:5174` |
| Laravel | `http://localhost:8001` |
| Adminer | `http://localhost:8082` |
| MySQL desde Windows | `localhost:3307` |
| MySQL dentro de Docker | `db:3306` |

Si Docker muestra:

```text
port is already allocated
```

significa que otro programa o contenedor está utilizando uno de esos puertos.

No elimines otros contenedores sin confirmar primero qué aplicación los utiliza.

---

# Checklist de instalación

```text
[ ] Docker Desktop está instalado
[ ] Docker Engine está en estado Running
[ ] Existe Backend/.env
[ ] APP_KEY tiene una clave
[ ] frontend está Running
[ ] backend está Running
[ ] db está Healthy
[ ] adminer está Running
[ ] Las migraciones están ejecutadas
[ ] El administrador local existe
[ ] http://localhost:5174 abre correctamente
[ ] http://localhost:8082 abre correctamente
[ ] /admin/login permite iniciar sesión
```

Cuando todos los puntos estén correctos, **QUORUM está listo para desarrollo local con Docker**.
