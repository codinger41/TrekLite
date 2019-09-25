import React, { useEffect, useState, useReducer } from 'react'
import { StatusBar, View } from 'react-native'
import * as Font from 'expo-font'
import { ApolloProvider } from 'react-apollo'
import FlashMessage from 'react-native-flash-message'
import Navigation from './src/'
import Store from './src/contexts/Store'
import combined from './src/reducers'
import initialState from './src/reducers/initialState'
import getActions from './src/actions'
import client from './src/graphql/client'

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)
  const [state, dispatch] = useReducer(combined, initialState)

  useEffect(() => {
    Font.loadAsync({
      'sigmar': require('./assets/sigmar.ttf'),
      'ubuntu': require('./assets/ubuntu.ttf'),
    }).then(() => setFontLoaded(true))
  })

  if (!fontLoaded) return <View />
  return (
    <ApolloProvider client={client} >
      <Store.Provider value={{
        ...state,
        ...getActions(dispatch)
      }}>
        <StatusBar barStyle="light-content" backgroundColor="#F03955" />
        <Navigation />
        <FlashMessage position="top" />
      </Store.Provider>
    </ApolloProvider>
  );
}
