import locations from './locations'
import trips from './trip'
import trekkers from './trekkers'

const combineReducers = reducers => {
  return (state = {}, action) =>
    Object.keys(reducers).reduce(
      (nextState, key) => ({
        ...nextState,
        [key]: reducers[key](state[key], action)
      }),
      {}
    )
}

const combined = combineReducers({
  locations,
  trips,
  trekkers
})

export default combined
