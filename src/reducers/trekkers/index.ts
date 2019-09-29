import initialState from '../initialState'

type actionType = {
  type: string
  payload: any
}

const comparer = otherArray => {
  return function(current) {
    return (
      otherArray.filter(function(other) {
        return other.id === current.id
      }).length == 0
    )
  }
}

const updateActiveTrekkers = (
  activeTrekkers: Array<object>,
  newActiveUser: object
) => {
  const newChallenges = [newActiveUser].filter(comparer(activeTrekkers))
  return activeTrekkers.concat(newChallenges)
}

const TrekkerReducer = (state: any = initialState, action: actionType) => {
  switch (action.type) {
    case 'SET_TREKKERS':
      return {
        ...state,
        activeTrekkers: updateActiveTrekkers(
          state.activeTrekkers,
          action.payload
        )
      }
    default:
      return state
  }
}

export default TrekkerReducer
