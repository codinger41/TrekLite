import React, { useContext, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator
} from 'react-native'
import Modalize from 'react-native-modalize'
import { Mutation } from 'react-apollo'
import { showMessage as displayMessage } from 'react-native-flash-message'
import styles from './styles'
import { getHeight } from '../../utils/style'
import { CREATE_TRIP } from '../../graphql/mutations/trip'
import TrekkerCard from '../../components/TrekkerCard'
import Store from '../../contexts/Store'
import Geocoder from '../../utils/geocoder'

const showMessage: any = displayMessage

const TripActions = ({}) => {
  const context: any = useContext(Store)
  const {
    locations: { currentLocation, destination, currentAddress },
    trips: { distance, estimatedTime },
    setCurrentLocation,
    setTrip,
    trekkers: { activeTrekkers }
  } = context

  useEffect(() => {
    if (currentLocation && !currentAddress) {
      Geocoder.from(currentLocation).then(json => {
        const location = json.results[0].formatted_address
        return setCurrentLocation({
          currentAddress: location
        })
      })
    }
  }, [currentLocation])

  return (
    <View
      style={{
        height: destination ? getHeight(390) : getHeight(230)
      }}
    >
      <Mutation mutation={CREATE_TRIP}>
        {(createTrip: Function, { data, loading, error }: any) => {
          return (
            <React.Fragment>
              {/* <Text style={styles.activeTrekkersTxt}>Active Trekkers near you</Text> */}
              <Text style={styles.activeTrekkersTxt}>Trip Details</Text>
              {currentAddress && (
                <Text style={styles.tripDetailTitle}>
                  Current Address:
                  {'  '}
                  <Text style={styles.tripDetailValue}>{currentAddress}</Text>
                </Text>
              )}
              {!destination && (
                <Text style={styles.tripDetailValue}>
                  Select a destination to start a trip.
                </Text>
              )}
              {destination && (
                <Text style={styles.tripDetailTitle}>
                  Destination:
                  {'  '}
                  <Text style={styles.tripDetailValue}>
                    {destination.formatted_address}
                  </Text>
                </Text>
              )}
              {estimatedTime && (
                <Text style={styles.tripDetailTitle}>
                  Estimated Time (by foot):
                  {'  '}
                  <Text style={styles.tripDetailValue}>
                    {(Math.round(estimatedTime * 60) * 100) / 100} min
                  </Text>
                </Text>
              )}
              {distance && (
                <Text style={styles.tripDetailTitle}>
                  Distance:
                  {'  '}
                  <Text style={styles.tripDetailValue}>
                    {parseFloat(distance.toFixed(2))} km
                  </Text>
                </Text>
              )}
              {destination && (
                <React.Fragment>
                  <Text style={styles.activeTrekkersTxt}>
                    Active Trekkers near you
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {activeTrekkers &&
                      activeTrekkers.map(trekker => {
                        return <TrekkerCard key={trekker.id} {...trekker} />
                      })}
                  </ScrollView>
                </React.Fragment>
              )}
              <TouchableOpacity
                style={[
                  styles.btn,
                  !destination &&
                    !estimatedTime &&
                    !distance && { backgroundColor: 'lightgrey' }
                ]}
                activeOpacity={!destination ? 1 : 0.5}
                onPress={() => {
                  if (!destination && !estimatedTime && !distance) return
                  return createTrip({
                    variables: {
                      distance,
                      destinationLatitude: destination.geometry.location.lat,
                      destinationLongitude: destination.geometry.location.lng,
                      startAddress: currentAddress,
                      startLatitude: currentLocation.latitude,
                      startLongitude: currentLocation.longitude,
                      estimatedTime: estimatedTime,
                      destinationAddress: destination.formatted_address
                    }
                  })
                    .then(res => {
                      showMessage({
                        type: 'success',
                        message: 'Trip started successfully!',
                        description: 'You never trek alone.'
                      })
                      return setTrip({
                        currentTrip: res.data.createTrip.trip
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
                  <Text style={styles.btnText}>Start Trip</Text>
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
