<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Proyecto de Backend con NestJS

Este es un proyecto de backend desarrollado con NestJS, TypeScript, PostgreSQL y Cloudinary para la gestión de archivos.

## Instalación

```bash
$ npm install

Ejecutar la Aplicación

# Modo de desarrollo
$ npm run start:dev

# Modo de producción
$ npm run start:prod

Pruebas

# Pruebas unitarias
$ npm run test

# Pruebas end-to-end (e2e)
$ npm run test:e2e

# Cobertura de pruebas
$ npm run test:cov



## Características

1. Gestión de Usuarios y Productos
2. Autenticación con Tokens JWT
3. Control de Acceso basado en Roles
4. Integración con Cloudinary para gestión de archivos
5. Dockerización para Desarrollo Local

## Soporte

Este proyecto está licenciado bajo MIT y cuenta con el apoyo de la comunidad. Si deseas contribuir o apoyar el proyecto, por favor [lee más aquí](link_to_support).

## Mantente en Contacto

- Autor: [Tu Nombre]
- GitHub: [Tu Perfil de GitHub]
- Sitio Web: [Tu Sitio Web]

## Licencia

Este proyecto está licenciado bajo MIT.

---

### Detalles de Implementación

1. ##Creación del Proyecto en NestJS:
   - Utiliza `nest new ecommerce-<github-username>` para iniciar un nuevo proyecto en NestJS.

2. ##Creación de Controllers y Services:
   - Genera controladores con `nest generate controller <controller-name>`.
   - Crea servicios con `nest generate service <service-name>`.

3. ##Implementación de Endpoints GET:
   - Crea los métodos en los controladores para `/products`, `/users`, y `/auth`.

4. ##Middleware Global para Logging:
   - Implementa un middleware global para registrar las solicitudes entrantes.

5. ##Repositorios para Users y Products:
   - Define repositorios utilizando TypeORM para interactuar con la base de datos.

6. ##Carga de Entidades de Prueba:
   - Crea instancias de Users y Products con datos hardcodeados.

7. ##Endpoints CRUD para Products y Users:
   - Implementa métodos para manejar operaciones CRUD en los controladores.

8. ##Validación en POST y PUT:
   - Agrega validaciones en los controladores para asegurar que la estructura de la entidad enviada en las solicitudes POST y PUT sea correcta.

9. ##Configuración de GET para Query Params:
   - Modifica el método GET para recibir parámetros opcionales como query params.

10. ##Implementación del Endpoint POST /auth/signin:
    - Crea el endpoint para manejar inicio de sesión con email y password.

11. ##Guarda AuthGuard y Configuración de TypeORM:
    - Implementa un AuthGuard y configura TypeORM con PostgreSQL.

12. ##Definición de Entidades TypeORM:
    - Define las entidades Users y Products con atributos y relaciones.

13. ##Global Pipe de Class-Validator y Configuración de Cloudinary:
    - Utiliza class-validator para validar estructuras de DTOs.
    - Configura una cuenta en Cloudinary para gestión de archivos.

14. ####Gestión de Archivos con Cloudinary:
    - Implementa la lógica para cargar imágenes y actualizar productos en Cloudinary y la base de datos.

15. ##Endpoint POST /auth/signup:
    - Crea el endpoint para registro de usuarios con contraseña hasheada.

16. ##Autenticación JWT y Rol de Administrador:
    - Modifica signIn para validar contraseñas encriptadas y generar tokens JWT.
    - Implementa un guardián para validar roles de administrador.

17. ##Control de Acceso basado en Roles:
    - Define roles de usuario y protege las rutas según roles utilizando AuthGuard.

18. ##Integración de Swagger:
    - Instala y configura @nestjs/swagger para documentación dinámica de la API.

19. ##Dockerización de la Aplicación:
    - Crea Dockerfile y docker-compose para despliegue en contenedores.

20. ##Pruebas de la Aplicación:
    - Realiza pruebas integrales de la API utilizando la interfaz de Open API (Swagger) para validar todas las funcionalidades de la aplicación.