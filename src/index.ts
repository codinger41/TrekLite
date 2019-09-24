import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from './screens/Home'

export default createAppContainer(createStackNavigator({
  Home
}, {
  headerMode: 'none'
}));
