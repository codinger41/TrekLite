import { StyleSheet } from 'react-native'
import { getHeight, getWidth } from '../../utils/style'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eeeeef',
    width: getWidth(80),
    height: getHeight(100),
    marginLeft: getWidth(15),
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: getHeight(10),
    borderRadius: getWidth(10)
  },
  image: {
    width: getWidth(50),
    height: getWidth(50),
    borderRadius: getWidth(50) / 2,
    borderColor: '#F03955',
    borderWidth: 1
  },
  text: {
    fontSize: getHeight(13),
    fontFamily: 'ubuntu',
    color: 'grey'
  }
})

export default styles
