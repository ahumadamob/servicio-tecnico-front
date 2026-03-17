# servicio-tecnico-front

Frontend Angular para gestión de servicio técnico.

## Prerrequisitos

- Node.js 18+
- npm 9+
- Angular CLI (`npm install -g @angular/cli`)

## Instalar y correr

```bash
npm install
ng serve
```

Luego abre `http://localhost:4200/`.

## Temas (Bootswatch)

### Cambiar tema activo (un único punto)

Edita **solo** esta línea en:

- `src/styles/themes/_theme-loader.scss`

Ejemplo:

```scss
@use './simplex';
```

Cámbiala por otro archivo de tema (por ejemplo `@use './cerulean';`).

### Agregar un nuevo tema Bootswatch

1. Crea un archivo nuevo en `src/styles/themes/`, por ejemplo `cerulean.scss`:

```scss
@import 'bootswatch/dist/cerulean/variables';
@import 'bootstrap/scss/bootstrap';
@import 'bootswatch/dist/cerulean/bootswatch';
```

2. Cambia el tema activo en `src/styles/themes/_theme-loader.scss` para usar ese archivo.

## Estructura rápida

- `src/app/layout` (convención): componentes de estructura visual global (header, shell, etc.).
- `src/app/features`: módulos/páginas por funcionalidad (ej.: `dashboard`).
- `src/app/shared` (convención): componentes, pipes y utilidades reutilizables.
- `src/styles`: estilos globales, variables y temas Bootswatch.
