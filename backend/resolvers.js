const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Appointment = require('./models/appointment')
const User = require('./models/user')

const resolvers = {
  User: {
    appointments: async (root, args, context) => {
      const appointments = await Appointment.find({ user: context.currentUser })
      return appointments
    }
  },
  Appointment: {
    user: async (root) => {
      const user = await User.findOne({ id: root.user.id })
      return user
    }
  },
  Query: {
    me: (root, args, context) => {
      return context.currentUser
    },
    allAppts: async () => await Appointment.find({}),
    apptByUser: async (root, args, context) => await Appointment.find({ user: context.currentUser }),
    singleAppt: async (root, args) => {
      return await Appointment.findById(args.id)
    },
    getProfile: async (roots, args, context) => await User.findById(context.currentUser.id)
  },
  Mutation: {
    createUser: async (root, args) => {
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(args.password, saltRounds)
      const user = new User({ username: args.username, password: passwordHash, email: args.email, profile: null, appointments: [] })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(args.password, user.password)

      if (!user || !passwordCorrect) {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
    createAppt: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      try {
        const appointment = new Appointment({ date: args.date, time: args.time, provider: args.provider, user: context.currentUser })
        appointment.save()
        return appointment
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAppt: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      try {
        const appointment = await Appointment.findOneAndUpdate(
          { id: args.appointmentId },
          {
            date: args.date,
            time: args.time,
            provider: args.provider
          },
          { new: true })
        return appointment
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    deleteAppt: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      try {
        await Appointment.findByIdAndDelete(args.id)
        return // decided to leave this return type as Boolean bc of laziness!
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editProfile: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      const newProfile = {
        name: args.name,
        dob: args.dob,
        healthcard: args.healthcard,
        street: args.street,
        city: args.city,
        postalCode: args.postalCode,
        gender: args.gender,
        maritalStatus: args.maritalStatus,
        phone: args.phone,
        contactByPhone: args.contactByPhone,
        emergencyContact: args.emergencyContact,
        emergencyPhone: args.emergencyPhone,
        allergies: args.allergies,
        allergyDetails: args.allergyDetails,
        medications: args.medications,
        medicationDetails: args.medicationDetails
      }
      try {
        user = await User.findOneAndUpdate(
          { id: context.currentUser.id },
          { profile: newProfile },
          { new: true }
        )
        return user
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    }
  }
}

module.exports = resolvers