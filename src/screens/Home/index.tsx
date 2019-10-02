import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
  Platform
} from 'react-native'
import Map, {
  MarkerAnimated,
  PROVIDER_GOOGLE,
  Polyline
} from 'react-native-maps'
import { Query } from 'react-apollo'
import { Entypo } from '@expo/vector-icons'
import MapViewDirections from 'react-native-maps-directions'
import { showMessage as displayMessage } from 'react-native-flash-message'
import styles from './styles'
import { getHeight } from '../../utils/style'
import { GET_ACTIVE_TRIP } from '../../graphql/queries/trips'
import Store from '../../contexts/Store'
import { getDelta } from '../../utils/helpers'
import TripActions from '../../components/TripActions'
import CurrentActiveTrip from '../../components/currentTrip'
import pubnub from '../../utils/pubnub'

const showMessage: any = displayMessage

const getUserData = async () => {
  const user = await AsyncStorage.getItem('user')
  return JSON.parse(user)
}

const Home = ({ navigation }: ScreenProp) => {
  const context: any = useContext(Store)

  const {
    locations: {
      currentLocation,
      destination,
      currentAddress,
      passedCoordinates
    },
    trips: { distance, estimatedTime, currentTrip },
    trekkers: { activeTrekkers },
    setCurrentLocation,
    setTrip,
    setTrekkers
  } = context

  useEffect(() => {
    pubnub.addListener({
      status: function(statusEvent) {
        // console.log({ statusEvent })
      },
      message: function({ message }) {
        getUserData().then(data => {
          if (message.id === data.id) return
          return setTrekkers(message)
        })
      }
    })
    pubnub.subscribe({
      channels: ['trekkers']
    })

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      setCurrentLocation({
        currentLocation: {
          longitude: coords.longitude,
          latitude: coords.latitude
        }
      })
    })

    const interval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        getUserData().then(data => {
          const message = {
            ...data,
            ...coords,
            isTrekking: currentTrip ? true : false
          }
          pubnub.publish({
            message,
            channel: 'trekkers'
          })
        })
      })
    }, 5000)

    return () => {
      pubnub.removeListener()
      clearInterval(interval)
    }
  }, [destination])

  const currentLocationDelta =
    currentLocation &&
    getDelta(currentLocation.latitude, currentLocation.longitude, 1000)
  const destinationDelta =
    destination &&
    getDelta(
      destination.geometry.location.lat,
      destination.geometry.location.lng,
      distance
    )

  return (
    <View style={styles.container}>
      <Query query={GET_ACTIVE_TRIP} fetchPolicy="network-only">
        {({ data, loading, error }: any) => {
          if (loading)
            return (
              <ActivityIndicator
                color="#000"
                style={styles.activityIndicator}
              />
            )

          if (!error && data.getUserActiveTrip && !currentTrip) {
            if (data.getUserActiveTrip.status !== 'ended') {
              setTrip({
                currentTrip: data.getUserActiveTrip
              })
            }
          }
          if (error) {
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
                initialRegion={
                  currentLocation &&
                  currentLocationDelta && {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    longitudeDelta: currentLocationDelta.longitudeDelta,
                    latitudeDelta: currentLocationDelta.latitudeDelta
                  }
                }
              >
                <Polyline coordinates={passedCoordinates} strokeWidth={2} />
                {(destination || currentTrip) && (
                  <MarkerAnimated
                    coordinate={
                      destination
                        ? {
                            latitude: destination.geometry.location.lat,
                            longitude: destination.geometry.location.lng
                          }
                        : {
                            latitude: currentTrip.destinationLatitude,
                            longitude: currentTrip.destinationLongitude
                          }
                    }
                    title={
                      destination
                        ? destination.formatted_address
                        : currentTrip.destinationAddress
                    }
                    pinColor="#6610f2"
                  />
                )}
                {activeTrekkers &&
                  activeTrekkers.map(trekker => {
                    return (
                      <MarkerAnimated
                        key={trekker.id}
                        coordinate={{
                          latitude: trekker.latitude,
                          longitude: trekker.longitude
                        }}
                        title={trekker.fullname}
                        pinColor="blue"
                      />
                    )
                  })}
                {currentLocation && (
                  <MarkerAnimated
                    coordinate={currentLocation}
                    title="Your current location"
                    pinColor="red"
                  />
                )}
                {(destination || currentTrip) && (
                  <MapViewDirections
                    origin={currentLocation}
                    mode="WALKING"
                    strokeWidth={5}
                    destination={
                      destination
                        ? {
                            latitude: destination.geometry.location.lat,
                            longitude: destination.geometry.location.lng
                          }
                        : {
                            latitude: currentTrip.destinationLatitude,
                            longitude: currentTrip.destinationLongitude
                          }
                    }
                    apikey={'<INSERT PLACES API KEY>'}
                  />
                )}
              </Map>
              {!currentTrip && (
                <React.Fragment>
                  <TouchableOpacity
                    style={styles.locations}
                    onPress={() => navigation.navigate('LocationSelect')}
                  >
                    <Entypo
                      name="location"
                      size={getHeight(25)}
                      color="#F03955"
                    />
                    <Text style={styles.selectDestination}>
                      Select Destination
                    </Text>
                  </TouchableOpacity>
                  <TripActions />
                </React.Fragment>
              )}
              {currentTrip && <CurrentActiveTrip />}
            </React.Fragment>
          )
        }}
      </Query>
    </View>
  )
}

export default Home
