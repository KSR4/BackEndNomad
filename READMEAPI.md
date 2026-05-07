# API Documentation 🚀

Esta documentación detalla todas las rutas disponibles en la API, estructuradas por entidad, especificando sus modelos de datos (incluyendo **ENUMs**), los parámetros requeridos, valores devueltos y códigos de error por ruta.

---

## 📌 Requisitos Generales
- **URL Base**: `http://localhost:3000`
- **Autenticación**: `Bearer <token>` en el encabezado `Authorization` para rutas protegidas.
- **Roles Globales** (Enum `Role`): 
  - `USER`: Cliente regular.
  - `OWNER`: Propietario de tienda(s).
  - `ADMIN`: Administrador de la plataforma.
- **Rate Limiting**:
  - **Global**: Máximo 100 peticiones por minuto por IP.
  - **Login (`/v1/login`)**: Máximo 5 intentos por cada 15 minutos por IP.

---

## 🗃️ Entidades y Modelos de Datos

A continuación, se describen las entidades principales, sus parámetros y los ENUMs que utilizan.

### 👤 User
| Campo | Tipo | Notas |
|---|---|---|
| `id` | `string` | Clave primaria (UUID) |
| `username` | `string` | |
| `email` | `string` | |
| `password` | `string` | Hash SHA-512 |
| `role` | `enum Role` | Valores: `ADMIN`, `USER`, `OWNER` |
| `avatar` | `string \| null` | Base64 string o null |
| `isVerified` | `boolean` | Por defecto: `false` |
| `verificationToken` | `string \| null` | Token para verificar email |
| `verificationTokenExpires` | `Date \| null` | Caducidad del token |
| `resetPasswordToken` | `string \| null` | Token para recuperación de contraseña |
| `resetPasswordExpires` | `Date \| null` | Caducidad del token |

### 🏪 Shop
| Campo | Tipo | Notas |
|---|---|---|
| `id` | `string` | Clave primaria (UUID) |
| `name` | `string` | Nombre de la tienda |
| `ownerId` | `string` | Relación con el User propietario |
| `state` | `enum States` | Valores: `OPEN`, `CLOSED` |
| `openDate` | `Date \| null` | Fecha de apertura programada |
| `closeDate` | `Date \| null` | Fecha de cierre programada |
| `latitude` | `number` | Coordenada X |
| `longitude` | `number` | Coordenada Y |

### 📦 Order
| Campo | Tipo | Notas |
|---|---|---|
| `id` | `string` | Clave primaria (UUID) |
| `userId` | `string` | |
| `shopId` | `string` | |
| `eventId` | `string \| null` | |
| `pickUpDate` | `string` | Formato ISO Date |
| `state` | `enum orderState` | Valores: `PENDING`, `PREPARING`, `READY`, `DELIVERED` |
| `dishes` | `{dishId: string, quantity: number}[]` | Relación de platos |
| `changeReason` | `string` | Razón de algún cambio de estado reciente |

### 🍽️ Dish
| Campo | Tipo | Notas |
|---|---|---|
| `id` | `string` | Clave primaria (UUID) |
| `shopId` | `string` | |
| `name` | `string` | |
| `description` | `string` | |
| `price` | `number` | |
| `available` | `boolean` | Indica si está disponible para pedidos |
| `stock` | `number` | |

### 📅 Event
| Campo | Tipo | Notas |
|---|---|---|
| `id` | `string` | Clave primaria (UUID) |
| `name` | `string` | |
| `description` | `string` | |
| `location` | `string` | |
| `latitude` | `number` | Coordenada X (latitud) |
| `longitude` | `number` | Coordenada Y (longitud) |
| `startDate` | `string` | ISO Date |
| `finishDate` | `string` | ISO Date |

### 🎫 Ticket
| Campo | Tipo | Notas |
|---|---|---|
| `id` | `string` | Clave primaria (UUID) |
| `userId` | `string` | |
| `shopName` | `string` | Nombre de la tienda solicitada |
| `message` | `string` | Motivo o justificación del ticket |
| `accepted` | `boolean` | Estado del ticket gestionado por el admin |
| `createdAt` | `Date` | |
| `latitude` | `number` | Coordenadas solicitadas |
| `longitude` | `number` | Coordenadas solicitadas |

### 🔔 Notification
| Campo | Tipo | Notas |
|---|---|---|
| `id` | `string` | Clave primaria (UUID) |
| `title` | `string` | |
| `message` | `string` | |
| `userId` | `string \| null` | `null` indica notificación broadcast (para todos) |
| `isRead` | `boolean` | Por defecto `false`. El usuario la marca como leída |
| `createdAt` | `Date` | |

### 🆘 SupportTicket
| Campo | Tipo | Notas |
|---|---|---|
| `id` | `string` | Clave primaria (UUID) |
| `userId` | `string` | Usuario que abre el ticket |
| `subject` | `string` | Asunto del problema |
| `description` | `string` | Descripción detallada |
| `status` | `enum SupportTicketStatus` | Valores: `OPEN`, `IN_PROGRESS`, `CLOSED` |
| `createdAt` | `Date` | |

### ⭐️ Review
| Campo | Tipo | Notas |
|---|---|---|
| `id` | `string` | Clave primaria (UUID) |
| `userId` | `string` | |
| `orderId` | `string` | Para garantizar 1 review por pedido |
| `shopId` | `string` | |
| `text` | `string` | |
| `date` | `string` | ISO Date |

---

## 🛣️ Detalle de Rutas

A continuación se listan las rutas con los valores que esperan (Body/Params), los retornos y errores.

### 👤 Autorización y Usuario (`/v1/...`)

- **GET `/v1/health`** (Pública)
  - **Devuelve**: `{ "ok": true, "message": "Healthy" }`
  - **Errores**: `500 Internal Server Error`

- **POST `/v1/register`** (Pública)
  - **Body**: `{ "username": "string" (>3 chars), "email": "string", "password": "string" }`
  - **Devuelve**: `{ "ok": true }` (Envía email de verificación)
  - **Errores**: `400 Bad Request` (Faltan campos, username corto), `500`

- **POST `/v1/verify-email`** (Pública)
  - **Body**: `{ "token": "string" }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400 Bad Request` (Falta token, expirado, inválido), `500`

- **POST `/v1/resend-verification`** (Requiere token en Header)
  - **Body**: (Ninguno)
  - **Devuelve**: `{ "ok": true, "message": "Verification email resent successfully" }`
  - **Errores**: `400` (Ya verificado), `401 Unauthorized`, `404 Not Found`, `500`

- **POST `/v1/login`** (Pública)
  - **Body**: `{ "email": "string", "password": "string" }`
  - **Devuelve**: `{ "ok": true, "data": { "token": "string", "isVerified": boolean } }`
  - **Errores**: `400 Bad Request`, `401 Unauthorized` (Credenciales inválidas / Email no verificado), `500`

- **POST `/v1/forgot-password`** (Pública)
  - **Body**: `{ "email": "string" }`
  - **Devuelve**: `{ "ok": true }` (Envía link de reset si el email existe)
  - **Errores**: `400 Bad Request`, `500`

- **POST `/v1/reset-password`** (Pública)
  - **Body**: `{ "token": "string", "password": "string" }` (Neva contraseña)
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400 Bad Request` (Token expirado/inválido), `500`

- **GET `/v1/me`** (USER)
  - **Devuelve**: Datos sensibles del usuario obtenidos a partir del token JWT.
  - **Errores**: `401`, `500`

- **GET `/v1/user`** (ADMIN)
  - **Devuelve**: `{ "ok": true, "data": [User] }` (Lista de todos los usuarios)
  - **Errores**: `401`, `403 Forbidden`, `500`

- **PATCH `/v1/user/:id/avatar`** (USER)
  - **Params**: `id` (string)
  - **Body**: `{ "avatar": "string base64" }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400 Bad Request`, `401`, `404 Not Found`, `500`

- **PATCH `/v1/user/:id/email`** (USER)
  - **Params**: `id` (string)
  - **Body**: `{ "email": "string" }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400 Bad Request`, `401`, `404`, `500`

- **PATCH `/v1/user/:id/password`** (USER - Reset directo, típicamente admin)
  - **Params**: `id` (string)
  - **Body**: `{ "password": "string" }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `404`, `500`

- **POST `/v1/user/change-password`** (USER)
  - **Body**: `{ "currentPassword": "string", "newPassword": "string" }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401` (Contraseña actual incorrecta), `404`, `500`

- **PATCH `/v1/user/:id/username`** (USER)
  - **Params**: `id` (string)
  - **Body**: `{ "username": "string" }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `404`, `500`

- **PATCH `/v1/user/:id/role`** (ADMIN)
  - **Params**: `id` (string)
  - **Body**: `{ "role": "USER" | "OWNER" | "ADMIN" }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `403`, `404`, `500`

- **DELETE `/v1/user`** (USER)
  - **Body**: (Obtiene id del token)
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `500`

---

### 🏪 Tiendas (`/v1/shop`)

- **GET `/v1/shop`** (Pública)
  - **Query (Opcional)**: `?eventId=string`
  - **Devuelve**: `{ "ok": true, "data": [Shop] }`
  - **Errores**: `404 Not Found`, `500`

- **GET `/v1/shop/:id`** (Pública)
  - **Params**: `id` (string)
  - **Devuelve**: `{ "ok": true, "data": Shop }`
  - **Errores**: `404`, `500`

- **GET `/v1/shop/self`** (OWNER)
  - **Devuelve**: `{ "ok": true, "data": [Shop] }` (Tiendas del usuario autenticado)
  - **Errores**: `401`, `403`, `404`, `500`

- **GET `/v1/shop/menu/:id`** (Pública)
  - **Params**: `id` (string)
  - **Devuelve**: `{ "ok": true, "data": [Dish] }` (Platos de la tienda dada)
  - **Errores**: `404`, `500`

- **POST `/v1/shop`** (OWNER o ADMIN)
  - **Body**: `{ "shopName": "string", "latitude": number, "longitude": number, "userId": "string" (Opcional, solo admins) }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400 Bad Request`, `401`, `403`, `500`

- **PUT `/v1/shop/:id`** (OWNER)
  - **Params**: `id` (string)
  - **Body**: `{ "name": "string", "state": "OPEN"|"CLOSED", "latitude": number, "longitude": number }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `403`, `404`, `500`

- **PATCH `/v1/shop/:id/name`** (OWNER)
  - **Body**: `{ "name": "string" }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `403`, `404`, `500`

- **PATCH `/v1/shop/:id/state`** (OWNER)
  - **Body**: `{ "state": "OPEN"|"CLOSED" }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `403`, `404`, `500`

- **PATCH `/v1/shop/:id/location`** (OWNER)
  - **Body**: `{ "latitude": number, "longitude": number }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `403`, `404`, `500`

- **PATCH `/v1/shop/:id/schedule`** (OWNER)
  - **Body**: `{ "openDate": "ISO_Date" | null, "closeDate": "ISO_Date" | null }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `403`, `404`, `500`

---

### 📅 Eventos (`/v1/event`)

- **GET `/v1/event`** (Pública)
  - **Devuelve**: `{ "ok": true, "data": [Event] }`
  - **Errores**: `404`, `500`

- **GET `/v1/event/:id`** (Pública)
  - **Params**: `id` (string)
  - **Devuelve**: `{ "ok": true, "data": { event: Event, shops: [ { shop: Shop, menu: [Dish] } ], reservedDishes: number, soldOutDishes: [Dish] } }`
  - **Errores**: `404`, `500`

- **POST `/v1/event`** (ADMIN)
  - **Body**: `{ "name": "string", "description": "string", "location": "string", "latitude": number, "longitude": number, "startDate": "string", "finishDate": "string" }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `403`, `500`

- **POST `/v1/shop-event`** (USER / OWNER / ADMIN)
  - **Body**: `{ "eventId": "string", "shopId": "string" }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400 Bad Request` (Faltan parámetros, tienda ya en evento **activo**), `403 Forbidden` (Solo el owner o admin puede inscribir la tienda), `404 Not Found`, `500`

- **DELETE `/v1/shop-event/shop/:shopId`** (USER / OWNER / ADMIN)
  - **Params**: `shopId` (string)
  - **Devuelve**: `{ "ok": true }` (Desinscribe la tienda cancelando además los pedidos pendientes del truck en ese evento)
  - **Errores**: `400 Bad Request` (Tienda no encontrada en ningún evento), `403 Forbidden` (No es owner ni admin), `404 Not Found`, `500`

- **PUT `/v1/event/:id`** (ADMIN)
  - **Params**: `id` (string)
  - **Body**: `{ "name": "string", "description": "string", "location": "string", "latitude": number, "longitude": number, "startDate": "string", "finishDate": "string" }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `403`, `404`, `500`

- **DELETE `/v1/event/:id`** (ADMIN)
  - **Params**: `id` (string)
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `403`, `404`, `500`

---

### 🍽️ Platos (`/v1/dish`)

- **POST `/v1/dish`** (OWNER)
  - **Body**: `{ "shopId": "string", "name": "string", "description": "string", "price": number, "availability": boolean, "stock": number }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `403`, `500`

- **PUT `/v1/dish/:id`** (OWNER)
  - **Params**: `id` (string)
  - **Body**: `{ "name": "string", "description": "string", "price": number, "availability": boolean, "stock": number }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `403`, `404`, `500`

- **DELETE `/v1/dish/:id`** (OWNER)
  - **Params**: `id` (string)
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `403`, `404`, `500`

---

### 📦 Pedidos (`/v1/order`)

- **GET `/v1/order/self`** (USER)
  - **Devuelve**: `{ "ok": true, "data": [OrderDetallada] }` (Con platos expandidos y `totalPrice` calculado)
  - **Errores**: `401`, `404`, `500`

- **GET `/v1/order/shop/:id`** (OWNER)
  - **Params**: `id` (string)
  - **Devuelve**: `{ "ok": true, "data": [OrderDetallada] }`
  - **Errores**: `401`, `403`, `404`, `500`

- **POST `/v1/order`** (USER)
  - **Body**: `{ "foodtruckId": "string", "pickUpDate": "ISO_Date", "dishes": [ { "dishId": "string", "quantity": number } ] }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400 Bad Request` (Falta stock), `401`, `500`

- **PUT `/v1/order/:id`** (OWNER)
  - **Params**: `id` (string)
  - **Body**: `{ "state": "PREPARING" | "READY" | "DELIVERED" }` (El stock de platos se descuenta automáticamente si es DELIVERED)
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `403`, `404`, `500`

---

### 🎫 Peticiones / Tickets (`/v1/ticket`)

- **GET `/v1/ticket`** (ADMIN)
  - **Devuelve**: `{ "ok": true, "data": [Ticket enriched] }` (Lista de tickets. Inyecta `username` y `avatar` del que creó el ticket).
  - **Errores**: `401`, `403`, `404`, `500`

- **GET `/v1/ticket/:id`** (ADMIN)
  - **Params**: `id` (string)
  - **Devuelve**: `{ "ok": true, "data": "username" }`
  - **Errores**: `400`, `401`, `403`, `404`, `500`

- **POST `/v1/ticket`** (USER)
  - **Body**: `{ "shopName": "string", "message": "string", "latitude": number, "longitude": number }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400`, `401`, `500`

- **PATCH `/v1/ticket/:id/accepted`** (ADMIN)
  - **Params**: `id` (string)
  - **Body**: `{ "accepted": boolean }`
  - **Devuelve**: `Status 200`
  - **Nota**: Genera automáticamente una notificación al usuario indicando si su solicitud fue aceptada o rechazada.
  - **Errores**: `400`, `401`, `403`, `404`, `500`

---

### ⭐️ Reseñas (`/v1/review`)

- **GET `/v1/review/self`** (USER)
  - **Devuelve**: `{ "ok": true, "data": [Review] }`
  - **Errores**: `401`, `404`, `500`

- **GET `/v1/review/shop/:id`** (Pública)
  - **Params**: `id` (string)
  - **Devuelve**: `{ "ok": true, "data": [ReviewDetailed] }` (Con `username`, `avatar`, y array de `dishes` consumidos en el pedido).
  - **Errores**: `404`, `500`

- **POST `/v1/review/:id`** (USER)
  - **Params**: `id` (string, ID del Pedido - Order).
  - **Body**: `{ "text": "string", "date": "ISO_Date" }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400` ("A review already exists for this order"), `401`, `500`

---

### 🔔 Notificaciones (`/v1/notification`)

- **GET `/v1/notification`** (USER)
  - **Devuelve**: `{ "ok": true, "data": [Notification] }`. Devuelve array vacío si no hay notificaciones (Status 200 en vez de 404). Renderiza notificaciones del usuario específico y broadcast (userId `null`).
  - **Errores**: `401`, `500`

- **GET `/v1/notification/all`** (ADMIN)
  - **Devuelve**: `{ "ok": true, "data": [Notification] }`. Histórico de todas las notificaciones de la app.
  - **Errores**: `401`, `403`, `500`

- **POST `/v1/notification`** (ADMIN)
  - **Body**: `{ "title": "string", "message": "string", "userId": "string" | null }` (`userId` en null envía a todos).
  - **Devuelve**: `Status 200`
  - **Errores**: `400`, `401`, `403`, `500`

- **PATCH `/v1/notification/:id/read`** (USER)
  - **Params**: `id` (string)
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `401`, `403 Forbidden` (La notificación no pertenece al usuario), `404 Not Found`, `500`

---

### 🆘 Tickets de Soporte (`/v1/support-ticket`)

- **POST `/v1/support-ticket`** (USER)
  - **Body**: `{ "subject": "string", "description": "string" }`
  - **Devuelve**: `{ "ok": true }` (Status 201)
  - **Errores**: `400 Bad Request`, `401`, `500`

- **GET `/v1/support-ticket/me`** (USER)
  - **Devuelve**: `{ "ok": true, "data": [SupportTicket] }` (Tickets del usuario autenticado, ordenados por fecha desc).
  - **Errores**: `401`, `500`

- **GET `/v1/support-ticket`** (ADMIN)
  - **Devuelve**: `{ "ok": true, "data": [SupportTicket enriched] }` (Todos los tickets con `username` y `avatar` del usuario).
  - **Errores**: `401`, `403`, `500`

- **PATCH `/v1/support-ticket/:id/status`** (ADMIN)
  - **Params**: `id` (string)
  - **Body**: `{ "status": "OPEN" | "IN_PROGRESS" | "CLOSED" }`
  - **Devuelve**: `{ "ok": true }`
  - **Errores**: `400 Bad Request` (Status inválido), `401`, `403`, `404 Not Found`, `500`
