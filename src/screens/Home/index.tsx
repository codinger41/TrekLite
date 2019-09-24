import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, TextInput, ScrollView } from 'react-native'
import Map from 'react-native-maps'
import Modalize from 'react-native-modalize'
import * as Animated from 'react-native-animatable'
import styles from './styles'
import { getHeight } from '../../utils/style'
import { Entypo } from '@expo/vector-icons'
import TrekkerCard from '../../components/TrekkerCard'

const Home = ({  }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F03955" />
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
      <Modalize
        alwaysOpen={getHeight(190)}
        HeaderComponent={() => (
          <Text style={styles.modalHeader}>TrekLite</Text>
        )}
      >
        <Text style={styles.activeTrekkersTxt}>Active Trekkers near you</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TrekkerCard />
          <TrekkerCard />
          <TrekkerCard />
          <TrekkerCard />
        </ScrollView>
      </Modalize>
    </View>
  )
}

export default Home
