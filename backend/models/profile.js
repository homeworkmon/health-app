const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String
  },
  dob: {
    type: Number
  },
  healthcard: {
    type: String,
    minlength: 12,
    unique: true
  },
  street: {
    type: String
  },
  city: {
    type: String
  },
  postalCode: {
    type: String,
    minlength: 6
  },
  gender: {
    type: String
  },
  maritalStatus: {
    type: String
  },
  phone: {
    type: String
  },
  contactByPhone: {
    type: Boolean
  },
  emergencyContact: {
    type: String
  },
  emergencyPhone: {
    type: String
  },
  allergies: {
    type: Boolean
  },
  allergyDetails: {
    type: String
  },
  medications: {
    type: Boolean
  },
  medicationDetails: {
    type: String
  }
})

profileSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Profile', profileSchema)