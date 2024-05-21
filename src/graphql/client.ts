import { ApolloClient, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { graphqlCache } from './cache'

const httpLink = createHttpLink({
  uri: 'https://api.bettermode.com'
})

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from the environment variables
  const token = import.meta.env.VITE_ACCESS_TOKEN
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: graphqlCache
})

export default client
