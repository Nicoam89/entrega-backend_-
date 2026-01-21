📌 Proyecto Backend I – Entrega Final

Este proyecto es la Entrega Final del curso Backend I, y consiste en la implementación de una API REST para gestionar productos y carritos de compras usando tecnologías típicas de backend en JavaScript.

🚀 Descripción general

La API está construida con:

Node.js

Express

MongoDB (base de datos NoSQL)

Mongoose (ODM para MongoDB)

mongoose-paginate-v2 (para paginación)

Express Handlebars (para renderizar vistas)

El objetivo es manejar productos, carritos y vistas relacionadas tanto para consumo vía API como para representación del frontend con Handlebars.

📁 Estructura del proyecto

El repositorio contiene una estructura típica de backend con:

Proyecto_backend_I
├── src
│   ├── config
│   │   └── mongoose.js
│   ├── models
│   │   ├── product.model.js
│   │   └── cart.model.js
│   ├── routes
│   │   ├── products.router.js
│   │   ├── carts.router.js
│   │   └── views.router.js
│   ├── views
│   │   ├── layouts
│   │   │   └── main.handlebars
│   │   ├── index.handlebars
│   │   ├── productDetail.handlebars
│   │   └── cart.handlebars
│   ├── public
│   ├── app.js
│   └── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
``` :contentReference[oaicite:4]{index=4}

---

### 🛠️ **Qué hace el proyecto**

📌 **API funcional para:**

- Listar productos
- Crear / editar / eliminar productos
- Administrar carritos
- Mostrar vistas de productos y carritos vía Handlebars

🗂️ **Configuración de la base de datos con Mongoose y paginación**  
El proyecto incluye configuración de conexión con MongoDB y modelos para productos y carritos. :contentReference[oaicite:5]{index=5}