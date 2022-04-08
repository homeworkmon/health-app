const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const appointmentSchema = new mongoose.Schema({
  date: {
    type: String
  },
  provider: {
    type: String
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

appointmentSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Appointment', appointmentSchema)