import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'
import * as Google from 'expo-google-app-auth'
import { Mutation } from 'react-apollo'
import * as Animated from 'react-native-animatable'
import { AntDesign } from '@expo/vector-icons'
import { LinearGradient as Gradient } from 'expo-linear-gradient'
import { showMessage } from 'react-native-flash-message'
import styles from './styles'
import { getHeight } from '../../utils/style'
import { CREATE_USER_ACCOUNT } from '../../graphql/mutations/user'

const Auth = ({ navigation }: ScreenProp) => {
  const [authLoading, setLoading] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) return navigation.replace('Home')
      })
      .catch(err => {})
  })

  const completeAuth = (data: object) => {
    const {
      createUser: {
        token,
        user: { id, fullname, profilePhoto }
      }
    }: any = data
    return AsyncStorage.setItem('token', token).then(() =>
      AsyncStorage.setItem(
        'user',
        JSON.stringify({
          id,
          fullname,
          profilePhoto
        })
      )
    )
  }

  const initializeGoogleLogin = async (createAccount: Function) => {
    setLoading(true)
    try {
      const { type, user }: any = await Google.logInAsync({
        clientId: '',
        iosClientId:
          '246260706348-3eajibjmd6ue9qkrranlrgenvokci2ec.apps.googleusercontent.com',
        androidClientId:
          '246260706348-asvt7a9304bdosbalm95js8bkdomkrtg.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })
      setLoading(false)
      if (type === 'success') {
        return createAccount({
          variables: {
            email: user.email,
            fullname: user.name,
            profilePhoto: user.photoUrl
          }
        })
          .then(res => completeAuth(res.data))
          .then(() => navigation.navigate('Home'))
          .catch(error => {
            showMessage({
              message: {
                message: 'Error!',
                description: error.message
              },
              description: error.message,
              type: 'danger'
            })
          })
      }
    } catch ({ message }) {
      setLoading(false)
      showMessage({
        message: {
          message: 'Error!',
          description: message
        },
        type: 'danger'
      })
    }
  }

  return (
    <Mutation mutation={CREATE_USER_ACCOUNT}>
      {(createUserAccount: Function, { data, loading, error }: any) => {
        return (
          <View style={styles.container}>
            <Gradient style={styles.top} colors={['#6610f2', '#6f42c1']}>
              <Animated.Text
                style={styles.logoTxt}
                animation="slideInLeft"
                duration={500}
              >
                TrekLite
              </Animated.Text>
            </Gradient>
            <Text style={styles.signUpTxt}>Connect with other Trekkers!</Text>
            <TouchableOpacity
              style={styles.googlebtn}
              onPress={() => initializeGoogleLogin(createUserAccount)}
            >
              {authLoading || loading ? (
                <ActivityIndicator size="small" />
              ) : (
                <React.Fragment>
                  <AntDesign
                    name="google"
                    color="#F03955"
                    size={getHeight(25)}
                  />
                  <Text style={styles.googletxt}>Connect with Google</Text>
                </React.Fragment>
              )}
            </TouchableOpacity>
          </View>
        )
      }}
    </Mutation>
  )
}

export default Auth
