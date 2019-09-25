import React, { useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, StatusBar, ScrollView, Dimensions } from 'react-native'
import Map, { MarkerAnimated, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import Modalize from 'react-native-modalize'
import styles from './styles'
import { getHeight } from '../../utils/style'
import { Entypo } from '@expo/vector-icons'
import TrekkerCard from '../../components/TrekkerCard'
import Store from '../../contexts/Store'
import { getDelta } from '../../utils/helpers'


const Home = ({ navigation }: ScreenProp) => {
  const context: any = useContext(Store)
  const {
    locations: {
      currentLocation,
      destination,
      passedCoordinates
    },
    trips: {
      distance,
      estimatedTime
    },
    setCurrentLocation,
    setTrip
  } = context

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      })
    })
    // navigator.geolocation.watchPosition(position => {
    //   const { latitude, longitude } = position.coords;
    //   setPassedCoordinates({
    //     longitude,
    //     latitude
    //   })
    // })
  }, [destination])


  const currentLocationDelta = currentLocation && getDelta(currentLocation.latitude, currentLocation.longitude, 1000)
  const destinationDelta = destination && getDelta(
    destination.geometry.location.lat,
    destination.geometry.location.lng,
    distance
  )


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F03955" />
      <Map 
        style={styles.container}
        provider={PROVIDER_GOOGLE}
        initialRegion={currentLocation && currentLocationDelta && {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          longitudeDelta: currentLocationDelta.longitudeDelta,
          latitudeDelta: currentLocationDelta.latitudeDelta,
        }}
        region={currentLocation && currentLocationDelta && {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          longitudeDelta: currentLocationDelta.longitudeDelta,
          latitudeDelta: currentLocationDelta.latitudeDelta,
        }}
      >
        <Polyline coordinates={passedCoordinates} strokeWidth={2} />
        {destination && (
          <MarkerAnimated
            coordinate={{
              latitude: destination.geometry.location.lat,
              longitude: destination.geometry.location.lng,
            }}
            title={destination.formatted_address}
          />
        )}
        {currentLocation && (
          <MarkerAnimated
            coordinate={currentLocation}
            title='Your current location'
          />
        )}
        {destination && (
          <MapViewDirections
            origin={currentLocation}
            mode="WALKING"
            strokeWidth={5}
            destination={{
              latitude: destination.geometry.location.lat,
              longitude: destination.geometry.location.lng,
            }}
            apikey={"AIzaSyCH6YIv4oA88bUTscQJZd1KqAml9pza4uw"}
            onReady={result => {
              setTrip({
                distance: Math.round(result.distance) * 100 / 100,
                estimatedTime: result.duration
              })
            }}
          />
        )}
      </Map>
      <TouchableOpacity
        style={styles.locations}
        onPress={() => navigation.navigate('LocationSelect')}
      >
        <Entypo name="location" size={getHeight(25)} color="#F03955" />
        <Text style={styles.selectDestination}>Select Destination</Text>
      </TouchableOpacity>
      <Modalize alwaysOpen={getHeight(330)}>
        <Text style={styles.activeTrekkersTxt}>Active Trekkers near you</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TrekkerCard />
          <TrekkerCard />
          <TrekkerCard />
          <TrekkerCard />
        </ScrollView>
        <Text style={styles.activeTrekkersTxt}>Trip Details</Text>
        {destination && (
          <Text style={styles.tripDetailTitle}>
            Destination:
            {'  '}
            <Text style={styles.tripDetailValue}>{destination.formatted_address}</Text>
          </Text>
        )}
        {estimatedTime && (
            <Text style={styles.tripDetailTitle}>
              Estimated Time (by foot):
              {'  '}
              <Text style={styles.tripDetailValue}>{Math.round((estimatedTime * 60)) * 100 / 100} min</Text>
            </Text>
          )
        }
        {distance && (
          <Text style={styles.tripDetailTitle}>
            Distance:
            {'  '}
            <Text style={styles.tripDetailValue}>{Math.round(distance) * 100 / 100} km</Text>
          </Text>
        )}
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Confirm Trip</Text>
        </TouchableOpacity>
      </Modalize>
    </View>
  )
}

export default Home
