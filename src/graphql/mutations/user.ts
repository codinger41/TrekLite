import gql from 'graphql-tag'

export const CREATE_USER_ACCOUNT = gql`
  mutation createUserAccount(
    $email: String
    $fullname: String!
    $profilePhoto: String!
  ) {
    createUser(
      email: $email
      fullname: $fullname
      profilePhoto: $profilePhoto
    ) {
      user {
        id
        fullname
        email
        profilePhoto
      }
      token
    }
  }
`
