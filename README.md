
# 📂 **Sistema de Gestión de Clientes**

## 📝 Descripción del proyecto

Este proyecto es una **aplicación web de gestión de clientes** desarrollada en **React**. Permite registrar, consultar, editar y eliminar clientes. Incluye autenticación básica de usuarios, navegación con un **Dashboard Layout**, filtros de búsqueda y confirmaciones de eliminación mediante diálogos.

El objetivo principal es ofrecer una experiencia fluida para la administración de clientes en una compañía de prueba, utilizando buenas prácticas en componentes reutilizables, manejo de estado y comunicación con una API (simulada con `axios` y `json-server`).

---

## ⚙ Tecnologías utilizadas

- **Frontend:** React, React Router, Material-UI (MUI)  
- **Context:** React Context API (`AuthContext`) para manejar autenticación  
- **API & Servicios:** Axios (`clienteService`) con json-server para simular backend  
- **Componentes reutilizables:** DashboardLayout, ConfirmDialog  
- **Estilo:** Material-UI con tema personalizado  
- **Control de estado:** useState, useEffect, useCallback  
- **Navegación:** React Router DOM  

---

## 🏗 Arquitectura de carpetas

```

src/
│
├─ components/
│   ├─ DashboardLayout.jsx      # Layout principal con AppBar y Drawer
│   ├─ ConfirmDialog.jsx        # Modal de confirmación
│   └─ ...                      # Otros componentes compartidos
│
├─ context/
│   └─ AuthContext.jsx          # Contexto de autenticación
│
├─ pages/
│   ├─ Home.jsx                 # Dashboard de bienvenida
│   ├─ Clientes.jsx             # Consulta de clientes
│   ├─ ClienteForm.jsx          # Formulario para crear/editar clientes
│   └─ NotFound.jsx             # Página 404
│
├─ services/
│   ├─ clienteService.js        # Funciones CRUD para clientes
│   └─ axiosConfig.js           # Configuración base de axios
│
├─ App.jsx                      # Configuración de rutas y providers
├─ index.js                     # Punto de entrada de React
└─ ...                          # Otros archivos de configuración

````

---

## 🚀 Funcionalidades principales

1. **Consulta de clientes**
   - Filtros por nombre o identificación
   - Botón “Buscar” para cargar clientes desde la API
   - Tabla con listado de clientes y acciones (editar/eliminar)

2. **Formulario de cliente**
   - Crear y editar clientes
   - Validaciones en todos los campos obligatorios
   - Selección de intereses de cliente
   - Guardado y actualización con comunicación al servidor

3. **Dashboard Layout**
   - AppBar superior con menú, avatar y logout
   - Drawer lateral con navegación
   - Menú desplegable para móviles
   - Efectos visuales: sombra, color, transición

4. **Eliminación con confirmación**
   - Modal que solicita confirmación antes de borrar
   - Mensajes tipo Snackbar al eliminar correctamente o si hay error

5. **Navegación y rutas**
   - React Router para páginas Home, Clientes, ClienteForm
   - Página 404 si la ruta no existe

---

## 💻 Instalación y uso

1. Clonar repositorio:

```bash
git clone https://github.com/tuusuario/gestion-clientes.git
cd gestion-clientes
````

2. Instalar dependencias:

```bash
npm install
```

3. Iniciar la API simulada con `json-server`:

```bash
npx json-server --watch db.json --port 3001
```

4. Ejecutar la app:

```bash
npm start
```

5. Abrir en el navegador:

```
http://localhost:3000
```


## 🔧 Ejemplos de uso

* **Buscar clientes:** Escribe nombre o identificación y presiona la lupa.
* **Agregar cliente:** Presiona el botón “Agregar”, completa el formulario y guarda.
* **Editar cliente:** Presiona el ícono de lápiz en la fila correspondiente.
* **Eliminar cliente:** Presiona el ícono de basura, confirma en el modal.
* **Regresar al Home:** Botón “Regresar” desde cualquier pantalla de clientes.

---

## 📌 Buenas prácticas

* Cada página utiliza `DashboardLayout` para unificar la UI.
* Componentes reutilizables en `components/` para no repetir código.
* Servicios centralizados en `services/` para separar la lógica de la UI.
* Context API para manejar autenticación global (`AuthContext`).
* Estado controlado con hooks (`useState`, `useEffect`, `useCallback`).

---

## 🎯 Próximos pasos

* Conectar con backend real.
* Mejorar autenticación y roles de usuarios.
* Añadir paginación en tabla de clientes.
* Migrar datos de prueba a base de datos persistente.

---

## 🛠 Autor

Proyecto desarrollado como prueba y ejemplo de arquitectura moderna en React con Material-UI.


