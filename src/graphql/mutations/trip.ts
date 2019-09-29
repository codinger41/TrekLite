import gql from 'graphql-tag'

export const CREATE_TRIP = gql`
  mutation createTrip(
    $distance: Float!
    $destinationLatitude: Float!
    $destinationLongitude: Float!
    $startAddress: String!
    $startLatitude: Float!
    $startLongitude: Float!
    $estimatedTime: String!
    $destinationAddress: String!
  ) {
    createTrip(
      distance: $distance
      destinationLatitude: $destinationLatitude
      destinationLongitude: $destinationLongitude
      startAddress: $startAddress
      startLatitude: $startLatitude
      startLongitude: $startLongitude
      estimatedTime: $estimatedTime
      destinationAddress: $destinationAddress
    ) {
      trip {
        id
        distance
        destinationAddress
        destinationLatitude
        destinationLongitude
        startAddress
        startLatitude
        startLongitude
        estimatedTime
      }
    }
  }
`

export const END_TRIP = gql`
  mutation createTrip($tripId: Int!) {
    endTrip(tripId: $tripId) {
      trip {
        id
        distance
        destinationAddress
        destinationLatitude
        status
        destinationLongitude
        startAddress
        startLatitude
        startLongitude
        estimatedTime
      }
    }
  }
`
