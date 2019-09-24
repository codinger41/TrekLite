import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import * as Animated from 'react-native-animatable'
import { AntDesign } from '@expo/vector-icons'
import styles from './styles'
import { getHeight } from '../../utils/style'

const img = 'https://scontent-los2-1.cdninstagram.com/vp/0b8101c2fe6c5b1610248ad5f71b2543/5E24691E/t51.2885-19/s320x320/66470639_408639219762102_8689212155456651264_n.jpg?_nc_ht=scontent-los2-1.cdninstagram.com'

const TrekkerCard = ({}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={{ uri: img }} />
      <Text style={styles.text}>Olamilekan</Text>
    </TouchableOpacity>
  )
}

export default TrekkerCard
