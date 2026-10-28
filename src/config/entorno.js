const mongoUri = process.env.MONGODB_URI;

if (!mongoUri || !mongoUri.startsWith('mongodb')) {
  console.error('Error: La variable MONGODB_URI no está definida o su prefijo es incorrecto.');
  process.exit(1);
}

module.exports = {
  mongoUri,
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development'
};