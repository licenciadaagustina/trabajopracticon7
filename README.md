# TP 07: Persistencia inicial de reservas de salas

## 1. Punto de partida y nombre de la copia
- **Nombre de la copia:** `tp-07-salas-mongodb`
- **Punto de partida:** Copia funcional del TP 06 de desarrollo web con Node.js, conservando intacta la aplicación Express y los servicios en memoria[cite: 1, 2].

## 2. Versiones utilizadas y confirmación de entorno
- **Node.js:** Versión utilizada en el entorno de desarrollo.
- **Mongoose:** ORM utilizado para la conexión y modelado de datos.
- **Entorno de Base de Datos:** MongoDB Atlas (clúster gratuito Free - M0) utilizando una base de datos propia llamada `reservas_salas_u7`[cite: 1].

## 3. Pasos desde una descarga nueva
1. Clonar el repositorio y ubicarse en la carpeta raíz del proyecto.
2. Instalar las dependencias ejecutando:
   ```bash
   npm install
   ## 3. Pasos desde una descarga nueva (Continuación)
3. Preparar el clúster gratuito en MongoDB Atlas, configurar un usuario con permisos de lectura y escritura, y habilitar la IP correspondiente[cite: 2].
4. Crear en la raíz del proyecto un archivo `.env` basado en la configuración requerida[cite: 2].
5. Completar en el archivo `.env` la variable `MONGODB_URI` con los datos reales de conexión provistos por Atlas[cite: 2].

## 4. Diagnóstico DNS y Comandos de Ejecución
- **Ajuste DNS:** Se incorporó la configuración de `node:dns` con los resolutores autorizados (`8.8.8.8` y `1.1.1.1`) en el módulo de conexión para asegurar la resolución correcta de los nombres de dominio de Atlas[cite: 2].
- **Comandos principales:**
  - Probar conexión: `node --env-file .env scripts/comprobar-conexion.js`[cite: 2]
  - Crear una reserva: `node --env-file .env scripts/crear-reserva.js`[cite: 3]
  - Listar reservas: `node --env-file .env scripts/listar-reservas.js`[cite: 3]
  - Verificar calidad (lint/format): `npm run format`, `npm run check`[cite: 5]
  - Iniciar la aplicación web (sitio en memoria del TP06): `npm start`[cite: 5]

## 5. Mapa de archivos y explicación del esquema
- `src/config/entorno.js`: Lector centralizado de variables de entorno y URI.
- `src/config/base-datos.js`: Módulo de conexión a MongoDB con la configuración de DNS y control de recursos.
- `src/modelos/reserva.js`: Esquema y modelo de Mongoose asociado explícitamente a la colección `reservas`[cite: 3].
- `scripts/comprobar-conexion.js`: Script de diagnóstico de conectividad[cite: 2].
- `scripts/crear-reserva.js`: Script para la creación de una reserva válida de prueba[cite: 3].
- `scripts/listar-reservas.js`: Script para recuperar y mostrar el listado de reservas persistidas[cite: 3].

## 6. Campos y reglas del dominio
- **estudiante:** Obligatorio y sin espacios en extremos (`trim`)[cite: 3].
- **email:** Obligatorio, con `trim` y validación de presencia del carácter `@` mediante `match`[cite: 3].
- **sala:** Obligatorio, limitado mediante `enum` a `Sala Norte`, `Sala Sur` o `Sala Multimedia`[cite: 3].
- **fecha:** Obligatorio y no vacío tras aplicar `trim`[cite: 3].
- **turno:** Obligatorio, limitado mediante `enum` a `Mañana`, `Tarde` o `Noche`[cite: 3].
- **personas:** Obligatorio, validado como número entero entre 1 y 6 mediante `Number.isInteger` y límites numéricos[cite: 3].

## 7. Matriz mínima de pruebas

| Caso | Resultado Esperado | Resultado Observado / Estado | Cantidad Antes / Después |
| :--- | :--- | :--- | :--- |
| Conexión válida | Confirmación y proceso terminado[cite: 4] | Conexión exitosa y cierre correcto | N/A |
| Variable vacía | Fallo de configuración; sin mensaje de éxito[cite: 4] | Termina con error de configuración | N/A |
| Contraseña incorrecta | Fallo de autenticación; sin crear documentos[cite: 4] | Error de autenticación controlado | Sin cambios |
| Colección vacía | Listado de cantidad 0, sin error[cite: 4] | Listado con 0 registros | 0 |
| Reserva válida | Se guarda y devuelve `_id`[cite: 4] | Guardado exitoso con ID generado | Incrementa en +1 |
| Consulta desde proceso nuevo | Recupera ese `_id`[cite: 4] | ID recuperado correctamente desde otro proceso | Mantiene la cantidad |
| Segunda consulta | No agrega registros[cite: 4] | Listado idéntico sin alteraciones | Mantiene la cantidad |
| Estudiante vacío | Rechazo, cantidad sin cambios[cite: 4] | Validación de Mongoose rechaza el documento | Sin cambios |
| Email sin `@` | Rechazo, cantidad sin cambios[cite: 4] | Validación de Mongoose rechaza el documento | Sin cambios |
| Sala o turno no permitido | Rechazo, cantidad sin cambios[cite: 4] | Validación por enum rechaza el documento | Sin cambios |
| Fecha vacía | Rechazo, cantidad sin cambios[cite: 4] | Validación de Mongoose rechaza el documento | Sin cambios |
| Personas 0, 7 y 2.5 | Rechazo, cantidad sin cambios[cite: 4] | Rechazado por la regla de validación numérica | Sin cambios |
| Texto no numérico en personas | Rechazo de conversión, sin escritura[cite: 4] | Error de tipo de datos controlado | Sin cambios |

## 8. Evidencia de persistencia entre procesos
Se comprobó que al ejecutar el script de creación, el proceso finaliza guardando el documento en MongoDB Atlas. Al iniciar un nuevo proceso independiente ejecutando `listar-reservas.js`, el registro creado previamente se recupera exitosamente conservando el mismo `_id` y reflejando el incremento en la cantidad total de documentos[cite: 4].

## 9. Continuidad del sitio web
El servicio HTTP y las rutas web operan de forma independiente manteniendo la lógica basada en memoria del TP 06, asegurando que el funcionamiento anterior del sitio web y sus formularios continúen intactos al ejecutar `npm start`[cite: 2, 5].

## 10. Seguridad
Se confirma que no se exponen credenciales, contraseñas, datos personales ni el archivo `.env` en el control de versiones[cite: 2, 5].