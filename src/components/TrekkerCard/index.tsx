import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'

interface TrekkerProp {
  id: string
  profilePhoto: string
  fullname: string
}

const TrekkerCard = ({ profilePhoto, id, fullname }: TrekkerProp) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={{ uri: profilePhoto }} />
      <Text numberOfLines={1} style={styles.text}>
        {fullname}
      </Text>
    </TouchableOpacity>
  )
}

export default TrekkerCard
