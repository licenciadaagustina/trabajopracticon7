const mongoose = require('mongoose');
const Reserva = require('../modelos/reserva');
require('dotenv').config();

async function crearReserva() {
    try {
        console.log('Conectando a MongoDB Atlas...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conexión exitosa.\n');

        // Datos exactos que exige tu esquema de Mongoose
        const nuevaReserva = new Reserva({
            sala: 'Sala Norte', // Puede ser 'Sala Norte', 'Sala Sur' o 'Sala Multimedia'
            estudiante: 'Juan Pérez',
            email: 'juan.perez@example.com',
            turno: 'Mañana',
            fecha: new Date(),
            personas: 4 // Usamos 'personas' en lugar de 'capacidad'
        });

        const reservaGuardada = await nuevaReserva.save();
        console.log('¡Reserva creada con éxito!');
        console.log(reservaGuardada);

    } catch (error) {
        console.error('Error al crear la reserva:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\nConexión cerrada.');
    }
}

crearReserva();