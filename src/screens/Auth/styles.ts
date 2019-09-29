import { StyleSheet } from 'react-native'
import { getHeight, getWidth } from '../../utils/style'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  top: {
    backgroundColor: '#F03955',
    flex: 0.7,
    borderBottomRightRadius: getWidth(130),
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoTxt: {
    fontFamily: 'sigmar',
    fontSize: getHeight(40),
    color: '#fff'
  },
  signUpTxt: {
    alignSelf: 'center',
    fontSize: getHeight(20),
    fontFamily: 'ubuntu',
    marginTop: getHeight(50)
  },
  googlebtn: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    height: getHeight(50),
    width: getWidth(300),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: getHeight(15),
    borderRadius: getWidth(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  googletxt: {
    fontSize: getHeight(13),
    marginLeft: getWidth(10),
    fontFamily: 'ubuntu'
  }
})

export default styles
