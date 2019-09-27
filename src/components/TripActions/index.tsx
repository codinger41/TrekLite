import React, { useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native'
import Modalize from 'react-native-modalize'
import { Mutation } from 'react-apollo'
import { showMessage } from 'react-native-flash-message'
import styles from './styles'
import { getHeight } from '../../utils/style'
import { CREATE_TRIP } from '../../graphql/mutations/trip'
import TrekkerCard from '../../components/TrekkerCard'
import Store from '../../contexts/Store'
import Geocoder from '../../utils/geocoder'

const TripActions = ({}) => {
  const context: any = useContext(Store)
  const {
    locations: {
      currentLocation,
      destination,
      currentAddress
    },
    trips: {
      distance,
      estimatedTime
    },
    setCurrentLocation
  } = context

  useEffect(() => {
    if(currentLocation && !currentAddress) {
      Geocoder.from(currentLocation)
        .then(json => {
          const location = json.results[0].formatted_address
          return setCurrentLocation({
            currentAddress: location
          })
        })
        .catch(error => showMessage({
          type: 'danger',
          message: {
            message: 'Network Error!',
            description: 'Please check your internet connection'
          }
        }))
    }
  }, [currentLocation])

  return (
    <View
      style={{
        height: destination ? getHeight(330) : getHeight(300)
      }}
    >
      <Mutation mutation={CREATE_TRIP}>
        {(createUserAccount: Function, { data, loading, error }: any) => {
          if(loading) return <ActivityIndicator size="large" color="#000" style={{ marginTop: getHeight(100) }} />

          return (
            <React.Fragment>
              {/* <Text style={styles.activeTrekkersTxt}>Active Trekkers near you</Text> */}
              <Text style={styles.activeTrekkersTxt}>Trip Details</Text>
              {!destination && (
                <Text style={styles.tripDetailValue}>
                  Select a destination to start a trip.
                </Text>
              )}
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
              <Text style={styles.activeTrekkersTxt}>Active Trekkers near you</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <TrekkerCard />
              </ScrollView>
              <TouchableOpacity
                style={[
                  styles.btn,
                  (!destination && !estimatedTime && !distance) && { backgroundColor: 'lightgrey' }
                ]}
                activeOpacity={!destination ? 1 : 0.5}
              >
                <Text style={styles.btnText}>Confirm Trip</Text>
              </TouchableOpacity>
            </React.Fragment>
          )
        }}
      </Mutation>
    </View>
  )
}

export default TripActions
