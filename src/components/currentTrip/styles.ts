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
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: getHeight(10),
    width: getWidth(300),
    justifyContent: 'space-between'
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
    fontSize: getHeight(17),
    marginVertical: getHeight(10),
    fontFamily: 'ubuntu',
    marginLeft: getWidth(20)
  },
  selectDestination: {
    fontSize: getHeight(15),
    fontFamily: 'ubuntu',
    marginRight: getWidth(110)
  },
  tripDetailTitle: {
    fontSize: getHeight(13),
    fontFamily: 'ubuntu',
    marginLeft: getWidth(20),
    color: 'grey'
  },
  tripDetailValue: {
    fontSize: getHeight(13),
    marginVertical: getHeight(2),
    fontFamily: 'ubuntu',
    marginLeft: getWidth(20),
    width: getWidth(280)
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: 'red',
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
    marginVertical: getHeight(15),
    borderRadius: getWidth(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#fff',
    fontFamily: 'ubuntu'
  },
  card: {
    width: getWidth(330),
    marginTop: getHeight(10),
    paddingHorizontal: getWidth(10),
    paddingVertical: getHeight(10),
    backgroundColor: '#ffffff',
    height: getHeight(200),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.27,
    shadowRadius: 1.65,
    elevation: 1,
    borderRadius: 6
  },
  card2: {
    width: getWidth(300),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: getHeight(50),
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1
  },
  card3: {
    width: getWidth(145),
    alignSelf: 'center',
    height: getHeight(50),
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 1
  },
  dot: {
    height: getWidth(7),
    width: getWidth(7),
    borderRadius: getWidth(5) / 2,
    backgroundColor: 'red',
    alignSelf: 'center',
    position: 'absolute',
    left: getWidth(8)
  },
  column: {
    flexDirection: 'column'
  }
})

export default styles
