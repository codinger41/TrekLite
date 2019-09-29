import React from 'react'
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import * as Animated from 'react-native-animatable'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import styles from './styles'
import { getHeight } from '../../utils/style'

interface InputProps {
  placeholder: string
}

const Input = ({ placeholder }: InputProps) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Enter Location"
      minLength={2}
      autoFocus={false}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
      }}
      returnKeyType={'default'}
      fetchDetails={true}
      styles={{
        textInputContainer: {
          backgroundColor: 'transparent'
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: getHeight(40),
          color: '#5d5d5d',
          fontSize: getHeight(17),
          borderBottomColor: '#000',
          borderBottomWidth: 0.4
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}
      currentLocation={false}
      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyCH6YIv4oA88bUTscQJZd1KqAml9pza4uw',
        language: 'en',
        types: 'address'
      }}
    />
  )
}

export default Input
// AIzaSyCH6YIv4oA88bUTscQJZd1KqAml9pza4uw
