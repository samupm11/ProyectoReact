# Pokemon Store - Plataforma de Comercio Electrónico

Aplicación web de comercio electrónico desarrollada con React y JavaScript, utilizando Vite como entorno de desarrollo y construcción. El proyecto implementa un catálogo de productos, carrito de compras y un sistema de autenticación y persistencia de datos gestionado a través de Firebase.

## Características Principales

* **Autenticación de Usuarios:** Sistema seguro de registro e inicio de sesión utilizando Firebase Authentication.
* **Gestión de Estado Global:** Manejo del carrito de compras y la sesión del usuario mediante React Context API y hooks personalizados.
* **Catálogo de Productos:** Visualización de productos obtenidos desde Firestore con capacidades de:
    * Búsqueda por texto (nombre o descripción).
    * Filtrado por categorías.
    * Control de stock.
* **Carrito de Compras:** Funcionalidad para agregar, eliminar y modificar la cantidad de los productos, incluyendo el cálculo automático de subtotales y totales.

## Tecnologías Utilizadas

* **Frontend:** React 19, JavaScript (ES6+)
* **Enrutamiento:** React Router DOM v7
* **Backend / BaaS:** Firebase v12 (Authentication, Firestore)
* **Build Tool:** Vite
* **Calidad de Código:** ESLint configurado para React

## Requisitos Previos

Asegúrate de tener instalado en tu entorno local:

* [Node.js](https://nodejs.org/) (versión 18.0 o superior recomendada)
* Un gestor de paquetes como npm (incluido con Node.js) o Yarn.

## Instalación y Configuración

1.  **Clonar el repositorio**

    ```bash
    git clone <url-del-repositorio>
    cd pokemon-shop
    ```

2.  **Instalar las dependencias**

    ```bash
    npm install
    ```

3.  **Configuración de Firebase**
    
    El proyecto requiere una conexión a un proyecto de Firebase. Las credenciales de acceso se encuentran en el archivo `src/services/firebase.js`. Para desplegar tu propia instancia, debes reemplazar el objeto `firebaseConfig` con los datos proporcionados por tu consola de Firebase.

4.  **Ejecutar el entorno de desarrollo**

    ```bash
    npm run dev
    ```
    La aplicación estará disponible por defecto en `http://localhost:5173`.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos definidos en el `package.json`:

* `npm run dev`: Inicia el servidor de desarrollo local de Vite con Hot Module Replacement (HMR).
* `npm run build`: Compila y optimiza el proyecto para producción. Los archivos minificados se generarán en el directorio `dist`.
* `npm run lint`: Ejecuta ESLint para analizar el código `.js` y `.jsx` en busca de errores de sintaxis o violaciones de estilo.
* `npm run preview`: Inicia un servidor web local para probar la compilación generada en el directorio `dist` antes de su despliegue.

## Estructura del Proyecto

```text
├── public/                 # Recursos estáticos públicos (imágenes, iconos)
├── src/                    
│   ├── components/         # Componentes de interfaz reutilizables (Navbar, Footer)
│   ├── context/            # Proveedores de estado global (AuthContext.jsx, CartContext.jsx)
│   ├── pages/              # Vistas principales (Home, Login, Register, Products, ProductDetail, Cart)
│   ├── services/           # Configuración e inicialización de Firebase (firebase.js)
│   ├── App.jsx             # Componente raíz y enrutador principal
│   ├── main.jsx            # Punto de entrada de la aplicación
│   └── index.css           # Estilos globales
├── eslint.config.js        # Configuración de reglas de análisis de código
├── package.json            # Dependencias y scripts del proyecto
└── vite.config.js          # Configuración de empaquetado y plugins de Vite