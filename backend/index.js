require('dotenv').config({ path: __dirname + '/.env' })
const { ApolloServer, UserInputError, AuthenticationError } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const express = require('express')
const path = require('path')
const http = require('http')
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


const startApolloServer = async () => {
  const app = express()
  const httpServer = http.createServer(app)

  const corsOptions = {
    origin: 'http://localhost:3000'
  }

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
  await server.start()
  server.applyMiddleware({ app, cors: corsOptions })

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./build'))

    app.get('*', (req, res, next) => {
      res.sendFile(path.resolve(__dirname, 'build','index.html'))
    })
  }

  await new Promise(resolve => httpServer.listen({ port: process.env.PORT }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer()