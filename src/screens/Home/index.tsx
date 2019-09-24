import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, TextInput } from 'react-native'
import Map from 'react-native-maps'
import * as Animated from 'react-native-animatable'
import styles from './styles'
import { getHeight } from '../../utils/style'
import { Entypo } from '@expo/vector-icons'


const Home = ({  }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Map style={styles.container}>
      </Map>
      <View style={styles.locations}>
        <View style={styles.row}>
          <Entypo name="location-pin" size={getHeight(25)} color="#F03955"  />
          <TextInput
            style={styles.input}
            placeholder="Current Location"
          />
        </View>
        <View style={styles.divider} />
        <View style={styles.row2}>
          <Entypo name="location" size={getHeight(25)} color="#F03955" />
          <TextInput
            style={styles.input}
            placeholder="Destination"
          />
        </View>
      </View>
    </View>
  )
}

export default Home
