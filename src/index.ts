import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Auth from './screens/Auth'
import Home from './screens/Home'


export default createAppContainer(createStackNavigator({
  Auth,
  Home
}, {
  headerMode: 'none',
  initialRouteName: 'Home'
}));
