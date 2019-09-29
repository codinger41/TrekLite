import { StyleSheet } from 'react-native'
import { getHeight, getWidth } from '../../utils/style'

const styles = StyleSheet.create({
  input: {
    width: getWidth(200),
    height: getHeight(40),
    marginLeft: getWidth(10),
    fontSize: getHeight(16),
    fontFamily: 'ubuntu'
  }
})

export default styles
