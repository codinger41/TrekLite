import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, StatusBar, ActivityIndicator, AsyncStorage } from 'react-native'
import Map, { MarkerAnimated, PROVIDER_GOOGLE, Polyline } from 'react-native-maps'
import { Query } from 'react-apollo'
import { Entypo } from '@expo/vector-icons'
import PubNub from 'pubnub'
import MapViewDirections from 'react-native-maps-directions'
import { showMessage as displayMessage } from 'react-native-flash-message'
import styles from './styles'
import { getHeight } from '../../utils/style'
import { GET_ACTIVE_TRIP } from '../../graphql/queries/trips'
import Store from '../../contexts/Store'
import { getDelta } from '../../utils/helpers'
import TripActions from '../../components/TripActions'
import CurrentActiveTrip from '../../components/currentTrip'


const showMessage: any = displayMessage


const getUserData = async () => {
  const user = await AsyncStorage.getItem('user')
  return JSON.parse(user)
}

const Home = ({ navigation }: ScreenProp) => {

  const pubnub = new PubNub({
    publishKey: 'pub-c-eb5c4104-ca7a-4538-b17f-b8b5b2924166',
    subscribeKey: 'sub-c-3fa20908-e29e-11e9-89da-5a5bbf30aaae'
  })

  const context: any = useContext(Store)
  const [response, setResponse] = useState(0)

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
    pubnub.addListener({
      status: function(statusEvent) {
        console.log({ statusEvent })
      },
      message: function({ message }) {
        console.log({ message })
      }
    })
    pubnub.subscribe({
      channels: ['trekkers']
    })

    getUserData()
      .then((data) => {
        console.log(data)
        pubnub.publish({
          message: data,
          channel: 'trekkers'
        })
      })

    // navigator.geolocation.watchPosition(position => {
    //   const { latitude, longitude } = position.coords;
    //   setPassedCoordinates({
    //     longitude,
    //     latitude
    //   })
    // })
    return () => {
      pubnub.removeListener()
    }
  }, [destination])


  const currentLocationDelta = currentLocation && getDelta(currentLocation.latitude, currentLocation.longitude, 1000)
  const destinationDelta = destination && getDelta(
    destination.geometry.location.lat,
    destination.geometry.location.lng,
    distance
  )

  return (
    <View style={styles.container}>
      <Query
        query={GET_ACTIVE_TRIP}
        fetchPolicy="network-only"
      >
      {({ data, loading, error }: any) => {

        if(loading) return <ActivityIndicator color="#000" style={styles.activityIndicator}  />

        if(!error && data.getUserActiveTrip && !currentTrip) {
          if(data.getUserActiveTrip.status !== 'ended') {
            setTrip({
              currentTrip: data.getUserActiveTrip
            })
          }
        }
        if(error) {
          showMessage({
            type: 'danger',
            message: 'Network Error!',
            description: 'Please check your internet connection',
            duration: 5000
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
              {(destination || currentTrip) && (
                <MapViewDirections
                  origin={currentLocation}
                  mode="WALKING"
                  strokeWidth={5}
                  destination={
                    destination ? {
                      latitude: destination.geometry.location.lat,
                      longitude: destination.geometry.location.lng,
                    } : {
                      latitude: currentTrip.destinationLatitude,
                      longitude: currentTrip.destinationLongitude
                  }}
                  apikey={"AIzaSyCH6YIv4oA88bUTscQJZd1KqAml9pza4uw"}
                />
                )}
              </Map>
              {!currentTrip && (
                <React.Fragment>
                  <TouchableOpacity
                    style={styles.locations}
                    onPress={() => navigation.navigate('LocationSelect')}
                  >
                    <Entypo name="location" size={getHeight(25)} color="#F03955" />
                    <Text style={styles.selectDestination}>Select Destination</Text>
                  </TouchableOpacity>
                  <TripActions />
                </React.Fragment>
              )}
              {currentTrip && (
                <CurrentActiveTrip />
              )}
            </React.Fragment>
            )
          }}
        </Query>
    </View>
  )
}

export default Home
