import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './index.css'
import './styles/tailwind.css'
import App from './App'

const graphqlEndpoint = process.env.NODE_ENV === 'production'
  ? '/graphql'
  : 'http://localhost:3000/graphql'

const client = new ApolloClient({

  uri: graphqlEndpoint,  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </StrictMode>,
)
