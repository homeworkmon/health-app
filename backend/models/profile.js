const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  name: {
    type: String
  },
  dob: {
    type: String
  },
  healthcard: {
    type: String,
    minlength: 12
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

// export Schema for subdocument not model!
module.exports = profileSchema