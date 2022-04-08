const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const profileSchema = require('./profile')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  profile: profileSchema,
  appointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment'
    }
  ]
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)