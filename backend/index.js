require('dotenv').config({ path: __dirname + '/.env' })
const { ApolloServer, UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const typeDefs = require('./typedefs')
const resolvers = require('./resolvers')
const User = require('./models/user')


console.log('connecting to', process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})