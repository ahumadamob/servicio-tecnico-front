# UI Guidelines (MVP Servicio Técnico Soft)

Lineamientos para módulos administrativos (ABM), aplicados en Clientes y reutilizables:

1. Cada opción del menú abre una vista principal con grilla.
2. La grilla debe permitir ordenamiento por columnas relevantes.
3. La última columna de la grilla siempre es **Acciones**.
4. Encima de la grilla debe existir un botón primario de alta.
5. Las acciones de fila usan botones compactos, redondeados y con íconos.
6. Se utiliza exclusivamente **Bootstrap Icons**.
7. Alta, edición y visualización van por rutas separadas.
8. Al navegar a alta/edición/detalle no se muestra la grilla del listado.
9. Formularios: validación visual consistente (`is-invalid` + mensaje debajo).
10. Confirmaciones críticas (ej.: desactivar) usan modal estilo Bootstrap.
11. Transiciones entre vistas principales: fade suave.
12. Duración de transición recomendada: 150ms a 250ms (actual: 200ms).
13. Evitar sobrearquitectura y librerías de UI/estado adicionales en el MVP.
