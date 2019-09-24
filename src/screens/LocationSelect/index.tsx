import React from 'react'
import { View, Text, TouchableOpacity, StatusBar, TextInput, ScrollView } from 'react-native'
import Map from 'react-native-maps'
import Modalize from 'react-native-modalize'
import * as Animated from 'react-native-animatable'
import styles from './styles'
import { getHeight } from '../../utils/style'
import { Entypo } from '@expo/vector-icons'
import TrekkerCard from '../../components/TrekkerCard'
import Input from '../../components/Inputs'


const SelectLocation = ({  }) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F03955" />
      <Input placeholder="Select Destination" />
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Confirm Destination</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectLocation
