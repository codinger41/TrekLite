import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Auth from './screens/Auth'
import Home from './screens/Home'
import LocationSelect from './screens/LocationSelect'

export default createAppContainer(
  createStackNavigator(
    {
      Auth: {
        screen: Auth,
        navigationOptions: {
          header: null
        }
      },
      Home: {
        screen: Home,
        navigationOptions: {
          header: null
        }
      },
      LocationSelect: {
        screen: LocationSelect,
        navigationOptions: {
          title: 'Select Destination'
        }
      }
    },
    {
      // headerMode: 'none',
      // initialRouteName: 'Home'
    }
  )
)
