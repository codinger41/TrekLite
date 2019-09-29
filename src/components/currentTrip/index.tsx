import React, { useContext, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import { Mutation } from 'react-apollo'
import haversine from 'haversine'
import { showMessage as displayMessage } from 'react-native-flash-message'
import styles from './styles'
import { getHeight } from '../../utils/style'
import { END_TRIP } from '../../graphql/mutations/trip'
import TrekkerCard from '../../components/TrekkerCard'
import Store from '../../contexts/Store'
import Geocoder from '../../utils/geocoder'

const showMessage: any = displayMessage

const TripActions = ({}) => {
  const context: any = useContext(Store)
  const {
    locations: { currentLocation, destination, currentAddress },
    trips: { distance, estimatedTime, currentTrip },
    setCurrentLocation,
    setTrip
  } = context

  const getDistance = (): number => {
    if (currentTrip) {
      const {
        destinationAddress,
        destinationLatitude,
        destinationLongitude,
        startAddress,
        startLatitude,
        startLongitude,
        estimatedTime
      } = currentTrip

      return haversine(
        {
          longitude: startLongitude,
          latitude: startLatitude
        },
        {
          longitude: destinationLongitude,
          latitude: destinationLatitude
        }
      )
    }
  }

  const getTime = (): number => {
    if (currentTrip && getDistance()) {
      return (Math.round((getDistance() / 4.8) * 60) * 100) / 100
    }
  }

  return (
    <View
      style={{
        height: getHeight(330)
      }}
    >
      <Mutation mutation={END_TRIP}>
        {(endTrip: Function, { data, loading, error }: any) => {
          return (
            <React.Fragment>
              <Text style={styles.activeTrekkersTxt}>You're on a trip!</Text>
              <View style={styles.card}>
                <View style={styles.card2}>
                  <View style={styles.dot} />
                  <View style={styles.column}>
                    <Text style={styles.tripDetailTitle}>Start Location</Text>
                    {currentTrip && (
                      <Text numberOfLines={1} style={styles.tripDetailValue}>
                        {currentTrip.startAddress}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.card2}>
                  <View style={styles.dot} />
                  <View style={styles.column}>
                    <Text style={styles.tripDetailTitle}>
                      Destination Address
                    </Text>
                    {currentTrip && (
                      <Text numberOfLines={1} style={styles.tripDetailValue}>
                        {currentTrip.destinationAddress}
                      </Text>
                    )}
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.card3}>
                    <Text style={styles.tripDetailTitle}>Distance left</Text>
                    {currentTrip && (
                      <Text numberOfLines={1} style={styles.tripDetailValue}>
                        {parseFloat(getDistance().toFixed(2))} km
                      </Text>
                    )}
                  </View>
                  <View style={styles.card3}>
                    <Text style={styles.tripDetailTitle}>
                      Estimated Duration
                    </Text>
                    {currentTrip && (
                      <Text numberOfLines={1} style={styles.tripDetailValue}>
                        {getTime()} min
                      </Text>
                    )}
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.btn]}
                activeOpacity={!destination ? 1 : 0.5}
                onPress={() => {
                  return endTrip({
                    variables: {
                      tripId: Number(currentTrip.id)
                    }
                  })
                    .then(res => {
                      showMessage({
                        type: 'success',
                        message: 'Trip Ended Successfully!',
                        description: 'Hope you enjoyed the trek!'
                      })
                      return setTrip({
                        currentTrip: null
                      })
                    })
                    .catch(err =>
                      showMessage({
                        type: 'danger',
                        message: err.message,
                        description: err.message
                      })
                    )
                }}
              >
                {loading ? (
                  <ActivityIndicator size="large" color="#ffffff" />
                ) : (
                  <Text style={styles.btnText}>End Trip</Text>
                )}
              </TouchableOpacity>
            </React.Fragment>
          )
        }}
      </Mutation>
    </View>
  )
}

export default TripActions
