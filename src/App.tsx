import client from '@/graphql/client'
import Router from '@/router'
import { ApolloProvider } from './graphql/export'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
