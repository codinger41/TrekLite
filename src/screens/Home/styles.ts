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
  googletxt: {
    fontSize: getHeight(13),
    marginLeft: getWidth(10),
    fontFamily: 'ubuntu'
  },
  locations: {
    backgroundColor: '#fff',
    height: getHeight(50),
    width: getWidth(320),
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: getHeight(50),
    borderRadius: getWidth(6),
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: getWidth(20),
    justifyContent: 'space-between'
  },
  divider: {
    width: getWidth(300),
    backgroundColor: '#F03955',
    height: getHeight(1)
  },
  row: {
    flexDirection: 'row',
    height: getHeight(40),
    alignItems: 'center',
    width: getWidth(270),
    marginTop: getHeight(15)
  },
  row2: {
    flexDirection: 'row',
    height: getHeight(40),
    alignItems: 'center',
    width: getWidth(270),
    marginBottom: getHeight(15)
    // justifyContent: 'space-between'
  },
  input: {
    width: getWidth(200),
    height: getHeight(40),
    marginLeft: getWidth(10),
    fontSize: getHeight(16),
    fontFamily: 'ubuntu'
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    height: getHeight(300),
    backgroundColor: '#fff',
    width: '100%',
    borderTopRightRadius: getHeight(130)
  },
  modalHeader: {
    color: '#7a7980',
    fontWeight: 'bold',
    fontSize: getHeight(20),
    marginVertical: getHeight(10),
    fontFamily: 'ubuntu',
    alignSelf: 'center'
  },
  activeTrekkersTxt: {
    fontSize: getHeight(15),
    marginVertical: getHeight(10),
    fontFamily: 'ubuntu',
    marginLeft: getWidth(20)
  },
  selectDestination: {
    fontSize: getHeight(15),
    fontFamily: 'ubuntu',
    marginRight: getWidth(110)
  },
  tripDetailValue: {
    fontSize: getHeight(13),
    marginVertical: getHeight(5),
    fontFamily: 'ubuntu',
    marginLeft: getWidth(20),
    color: 'grey'
  },
  tripDetailTitle: {
    fontSize: getHeight(13),
    marginVertical: getHeight(5),
    fontFamily: 'ubuntu',
    marginLeft: getWidth(20)
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: '#F03955',
    height: getHeight(55),
    width: getWidth(330),
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
  btnText: {
    color: '#fff',
    fontFamily: 'ubuntu'
  },
  activityIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  }
})

export default styles
