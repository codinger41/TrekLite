import React, { useContext, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView} from 'react-native'
import Modalize from 'react-native-modalize'
import styles from './styles'
import { getHeight } from '../../utils/style'
import TrekkerCard from '../../components/TrekkerCard'
import Store from '../../contexts/Store'
import { getDelta } from '../../utils/helpers'


const TripActions = ({}) => {
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

  }, [destination])


  const currentLocationDelta = currentLocation && getDelta(currentLocation.latitude, currentLocation.longitude, 1000)

  return (
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
  )
}

export default TripActions
