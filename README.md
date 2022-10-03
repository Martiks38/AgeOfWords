# Age of Words

Juego de descubrir la palabra de cinco letras; con relación a age of empires II.

## Cómo ejecutar este proyecto

- Instalar dependencias

```
  APP
  Desde la carpeta app
  npm install

  API
  Desde la carpeta api
  npm install
```

- Variables de entorno

```
  API

  PORT: Opcional; por defecto, la API se ejecutará en el puerto 3000
  SECRET: clave empleada por jsonwebtoken
  CONNECTION: conexión a la base de datos
```

- Ejecutar proyecto

```
  APP
  npm run dev

  API
  npm run dev

  En Windows
  npm run dev-win

  DB
  Inicializar el servicio de MongoDB
```

## APP

### Desarrollo

- react 18.2.0
- react-dom 18.2.0
- typescript 4.6.4
- sass 1.54.9
- wouter 2.8.0-alpha.2
- vite 3.1.0

## API

### Desarrollo

- express 4.18.1
- mongoose 6.6.1
- bcryptjs 2.4.3
- jsonwebtoken 8.5.1
