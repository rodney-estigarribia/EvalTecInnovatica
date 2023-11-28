# Evaluación Técnica

Empresa: Innovatica
Rol: Desarrollador React Native

## Detalles

App React Native / Reactjs con Django

### Requerimientos:

#### Se debe gestionar:

1. Usuarios (Registro, Autenticación y Aprobación por parte del django admin)
2. Productos (Nombre, Estado, Categorías e Imágenes del producto)

#### Modelo de negocios:

1. No se requiere registro para visualizar Nombre y Estado del producto.
2. Se requiere registro para visualizar Nombre, Estado, Categorías e Imágenes del producto.
3. Se requiere usuario aprobado para modificar y eliminar productos.
4. El listado de productos debe tener filtros de búsqueda por nombre, estado y categorías, y solo debe mostrar la primera imagen, si hubiere.
   > **Nota**: Debido a limitantes de la API se realizó el filtro parcialmente usando la API en conjunto con filtros temporales sobre los datos retornados (categorias, estados).
5. Usar jwt para el manejo de sesión

## Aplicación desarrollada

### Flujo de la aplicación

Considerando los requerimientos se puede visualizar el flujo propuesto aqui

- https://www.figma.com/file/LhryKpWjxJZzBpJhgKQ27I/IDPY---INNOVATICA---EVALUACION-TECNICA?type=design&node-id=193%3A3231&mode=design&t=NB1kiLdGctzwKcTB-1

### Iniciar la aplicación

Primeramente, se pueden instalar las dependencias con:

```bash
yarn install

yarn pod-install
```

Luego se puede lanzar la aplicación con:

```bash
yarn start
```

> **Nota**: La aplicación tiene ajustes para funcionar con el conjunto de APIS en https://dummyjson.com/docs/ (Autenticacion, Productos, Usuarios).
