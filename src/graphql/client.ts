import { AsyncStorage } from 'react-native'
import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  from
} from 'apollo-client-preset'
import { setContext } from 'apollo-link-context'
import { createHttpLink } from 'apollo-link-http'

const GRAPHQL_API_ENDPOINT = 'https://treklite-backend.herokuapp.com/graphql'
// const GRAPHQL_API_ENDPOINT = 'http://localhost:5000/graphql'

const httpLink = createHttpLink({
  uri: GRAPHQL_API_ENDPOINT
})

const authMiddleware = setContext(async (req, { headers }) => {
  const token = await AsyncStorage.getItem('token')
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }
})

const client = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache()
})

export default client
