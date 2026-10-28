require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('node:dns');
const { mongoUri } = require('./entorno');

// Configuración de servidores DNS autorizados para evitar bloqueos con Atlas
dns.setServers(['8.8.8.8', '1.1.1.1']);

const conectarBD = async () => {
  await mongoose.connect(mongoUri);
  console.log('Conexión exitosa a MongoDB Atlas');
};

const desconectarBD = async () => {
  await mongoose.connection.close();
};

module.exports = { conectarBD, desconectarBD };