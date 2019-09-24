import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import * as Animated from 'react-native-animatable'
import { AntDesign } from '@expo/vector-icons'
import styles from './styles'
import { getHeight } from '../../utils/style'


const Auth = ({ navigation }: ScreenProp) => {
  return (
    <View style={styles.container}>
      <Animated.View
        style={styles.top}
        animation="slideInDown"
        duration={500}
      >
        <Animated.Text
          style={styles.logoTxt}
          animation="slideInLeft"
          duration={500}
        >
          TrekLite
        </Animated.Text>
      </Animated.View>
      <Text style={styles.signUpTxt}>Connect with other Trekkers!</Text>
      <TouchableOpacity
        style={styles.googlebtn}
        onPress={() => navigation.navigate('Home')}
      >
        <AntDesign
          name="google"
          color="#F03955"
          size={getHeight(25)}
        />
        <Text style={styles.googletxt}>Connect with Google</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Auth
