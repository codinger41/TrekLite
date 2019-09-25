import locations from './locations'

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
  locations
})

export default combined
