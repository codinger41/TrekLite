import gql from 'graphql-tag'

export const GET_ACTIVE_TRIP = gql`
  query getActiveTrip {
    getUserActiveTrip {
      id
      distance
      destinationAddress
      destinationLatitude
      destinationLongitude
      startAddress
      startLatitude
      startLongitude
      estimatedTime
      status
    }
  }
`
