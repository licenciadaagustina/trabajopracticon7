// scripts/comprobar-conexion.js
const { conectarBD, desconectarBD } = require('../src/config/base-datos');

const comprobarConexion = async () => {
  try {
    console.log('Iniciando prueba de conexión a MongoDB Atlas...');
    
    // 1 y 2. Esperar la conexión antes de anunciar éxito, sin crear reservas
    await conectarBD();
    console.log('Éxito: Conexión establecida correctamente con la base de datos.');
    
    // 3. Cerrar los recursos en caso de éxito
    await desconectarBD();
    process.exit(0);
  } catch (error) {
    // 4. Registrar el fallo y retornar un código de salida distinto de cero (1)
    console.error('Fallo en la conexión:', error.message);
    
    try {
      // 3. Cerrar los recursos también en caso de error
      await desconectarBD();
    } catch (errCierre) {
      // Ignorar si no se pudo cerrar una conexión que nunca abrió
    }
    
    process.exit(1);
  }
};

comprobarConexion();