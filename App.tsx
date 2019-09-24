import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import * as Font from 'expo-font'
import Navigation from './src/'

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    Font.loadAsync({
      'sigmar': require('./assets/sigmar.ttf'),
      'ubuntu': require('./assets/ubuntu.ttf'),
    }).then(() => setFontLoaded(true))
  })

  if (!fontLoaded) return <View />
  return (
    <React.Fragment>
      <StatusBar barStyle="light-content" backgroundColor="#F03955" />
      <Navigation />
    </React.Fragment>
  );
}
