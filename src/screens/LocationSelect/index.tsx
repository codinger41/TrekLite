import React, { useContext } from 'react'
import haversine from 'haversine'
import { View, Text, TouchableOpacity, StatusBar } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import styles from './styles'
import { getHeight } from '../../utils/style'
import Input from '../../components/Inputs'
import Store from '../../contexts/Store'

const SelectLocation = ({ navigation }: ScreenProp) => {
  const context: any = useContext(Store)

  const { setDestination, locations } = context
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F03955" />
      <GooglePlacesAutocomplete
        placeholder="Enter Location"
        minLength={2}
        autoFocus={false}
        currentLocation={false}
        onPress={(data, details = null) => {
          return setDestination(details)
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
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: '<INSERT GOOGLE PLACES API KEY>',
          language: 'en',
          types: 'address'
        }}
      />
      <TouchableOpacity
        style={[
          styles.btn,
          !locations.destination && { backgroundColor: 'lightgrey' }
        ]}
        activeOpacity={!locations.destination ? 1 : 0.5}
        onPress={() => {
          if (!locations.destination) return

          const distance = haversine(
            {
              longitude: locations.currentLocation.longitude,
              latitude: locations.currentLocation.latitude
            },
            {
              longitude: locations.destination.geometry.location.lng,
              latitude: locations.destination.geometry.location.lat
            }
          )

          context.setTrip({
            distance,
            estimatedTime: distance / 4.8
          })
          return navigation.goBack()
        }}
      >
        <Text style={styles.btnText}>Confirm Destination</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SelectLocation
