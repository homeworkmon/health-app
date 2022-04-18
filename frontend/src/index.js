import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import App from './App'
import '@fontsource/roboto/400.css'
import { setContext } from '@apollo/client/link/context'
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client'
import './index.css'
import { green } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: green,
    secondary: {
      main: green[900],
    },
  },
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)