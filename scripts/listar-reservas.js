const mongoose = require('mongoose');
const Reserva = require('../modelos/reserva');
require('dotenv').config();

async function listarReservas() {
    try {
        console.log('Conectando a MongoDB Atlas...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Conexión exitosa.\n');

        console.log('Buscando reservas...');
        const reservas = await Reserva.find();

        if (reservas.length === 0) {
            console.log('No se encontraron reservas registradas en la base de datos.');
        } else {
            console.log(`Se encontraron ${reservas.length} reserva(s):`);
            console.log(reservas);
        }

    } catch (error) {
        console.error('Error al listar las reservas:', error);
    } finally {
        await mongoose.connection.close();
        console.log('\nConexión cerrada.');
    }
}

listarReservas();