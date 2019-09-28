import React, { useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, StatusBar, ScrollView, Dimensions, ActivityIndicator } from 'react-native'
import Map, { MarkerAnimated, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { Query } from 'react-apollo'
import MapViewDirections from 'react-native-maps-directions'
import styles from './styles'
import { getHeight } from '../../utils/style'
import { Entypo } from '@expo/vector-icons'
import { GET_ACTIVE_TRIP } from '../../graphql/queries/trips'
import Store from '../../contexts/Store'
import { getDelta } from '../../utils/helpers'
import TripActions from '../../components/TripActions'
import { showMessage as displayMessage } from 'react-native-flash-message'

const showMessage: any = displayMessage

const Home = ({ navigation }: ScreenProp) => {
  const context: any = useContext(Store)
  const {
    locations: {
      currentLocation,
      destination,
      currentAddress,
      passedCoordinates
    },
    trips: {
      distance,
      estimatedTime,
      currentTrip
    },
    setCurrentLocation,
    setTrip
  } = context

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentLocation({
        currentLocation: {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        }
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
      <Query query={GET_ACTIVE_TRIP}>
      {({ data, loading, error, fetchMore, refetch }: any) => {

        if(loading) return <ActivityIndicator color="#000" style={styles.activityIndicator}  />

        if(data.getUserActiveTrip && !currentTrip) {
          setTrip({
            currentTrip: data.getUserActiveTrip
          })
        }
        if(error) {
          showMessage({
            type: 'danger',
            mmessage: 'Network Error!',
            description: 'Please check your internet connection'
          })
        }
        return (
          <React.Fragment>
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
              <TripActions />
            </React.Fragment>
            )
          }}
        </Query>
    </View>
  )
}

export default Home
