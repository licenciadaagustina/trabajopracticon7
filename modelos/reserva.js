const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  estudiante: {
    type: String,
    required: [true, 'El nombre del estudiante es obligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    trim: true,
    match: [/@/, 'El email debe contener el carácter @']
  },
  sala: {
    type: String,
    required: [true, 'La sala es obligatoria'],
    enum: {
      values: ['Sala Norte', 'Sala Sur', 'Sala Multimedia'],
      message: 'La sala debe ser Sala Norte, Sala Sur o Sala Multimedia'
    }
  },
  fecha: {
    type: String,
    required: [true, 'La fecha es obligatoria'],
    trim: true
  },
  turno: {
    type: String,
    required: [true, 'El turno es obligatorio'],
    enum: {
      values: ['Mañana', 'Tarde', 'Noche'],
      message: 'El turno debe ser Mañana, Tarde o Noche'
    }
  },
  personas: {
    type: Number,
    required: [true, 'La cantidad de personas es obligatoria'],
    validate: {
      validator: function(v) {
        return Number.isInteger(v) && v >= 1 && v <= 6;
      },
      message: 'La cantidad de personas debe ser un número entero entre 1 y 6'
    }
  }
}, {
  collection: 'reservas',
  versionKey: false
});

const Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = Reserva;