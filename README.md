# BlackListAO

Este proyecto es una aplicación Angular para gestionar listas personalizadas, creada con [Angular CLI](https://github.com/angular/angular-cli) versión 18.2.19.

## Estructura del proyecto

```
src/
  index.html
  main.ts
  styles.sass
  app/
    app-routing.module.ts
    app.component.ts
    app.module.ts
    features/
      layout/
    models/
    pages/
      home/
    shared/
      components/
      Store/
        actions/
        reducers/
        selectors/
```

## Características principales

- **Gestión de listas**: Crea, elimina y administra listas personalizadas.
- **Items en listas**: Añade, elimina y busca ítems dentro de cada lista.
- **Selección de fondo**: Personaliza el fondo de cada lista.
- **Persistencia**: El estado se guarda en `localStorage` usando un meta-reducer de NgRx.
- **Interfaz moderna**: Utiliza Angular Material y estilos SASS personalizados.
- **Componentes reutilizables**: Inputs, sidebar, tags, selectores de color, etc.

## Instalación

1. Clona el repositorio.
2. Ejecuta `npm install` para instalar las dependencias.

## Servidor de desarrollo

Ejecuta `ng serve` para iniciar el servidor de desarrollo. Navega a [http://localhost:4200/](http://localhost:4200/). La aplicación se recargará automáticamente si modificas algún archivo fuente.


## Estado global y persistencia

El estado de las listas se maneja con NgRx Store y se persiste automáticamente en `localStorage` usando el meta-reducer [`localStorageMetaReducer`](src/app/Store/reducers/localStorage.metareducer.ts).

## Ayuda adicional

Para más ayuda sobre Angular CLI usa `ng help` o visita la [documentación oficial](https://angular.dev/tools/cli).

---

Desarrollado por [Jardel Figueroa L.S].