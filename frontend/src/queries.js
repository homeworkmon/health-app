import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CREATE_ACCOUNT = gql`
  mutation signUp($username: String!, $password: String!) {
    createUser(username: $username, password: $password)
  }
`

const PROFILE = gql`fragment Profile on User {
  profile {
    name
    dob
    healthcard
    street
    city
    postalCode
    gender
    maritalStatus
    phone
    contactByPhone
    emergencyContact
    emergencyPhone
    allergies
    allergyDetails
    medications
    medicationDetails
  }
}
`

export const UPDATE_PROFILE = gql`
  mutation updateProfile($name: String!, $dob: String!, $healthcard: String!, $street: String, $city: String, $postalCode: String!,
    $gender: String!, $maritalStatus: String, $phone: String!, $contactByPhone: Boolean, $emergencyContact: String!, $emergencyPhone: String!, 
    $allergies: Boolean, $allergyDetails: String, $medications: Boolean, $medicationDetails: String) {
      editProfile(name: $name, dob: $dob, healthcard: $healthcard, street: $street, city: $city, postalCode: $postalCode, gender: $gender,
        maritalStatus: $maritalStatus, phone: $phone, contactByPhone: $contactByPhone, emergencyContact: $emergencyContact, emergencyPhone: $emergencyPhone,
        allergies: $allergies, allergyDetails: $allergyDetails, medications: $medications, medicationDetails: $medicationDetails) {
          ...Profile
        }
    }
    ${PROFILE}
`

export const GET_PROFILE = gql`
  query {
    getProfile {
      ...Profile
    }
  }
  ${PROFILE}
`

export const BOOKED_APPTS = gql`
query bookedAppt($provider: String!){
  apptByProvider(provider: $provider) {
      date, 
      provider,
      id
    }
  }
`

export const GET_USER_APPTS = gql`
  query {
    apptByUser {
        date, 
        provider,
        id
      }
    }
  `

export const CREATE_APPT= gql`
  mutation makeAppt($date: String!, $provider: String!) {
    createAppt(date: $date, provider: $provider) {
      id
    }
  }
`

export const DELETE_APPT = gql`
  mutation removeAppt($id: ID!) {
    deleteAppt(id: $id)
  }
`