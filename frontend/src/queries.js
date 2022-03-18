import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
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

export const GET_ALL_APPTS = gql`
  query {
    allAppts {
        date, 
        time
      }
    }
  `

export const GET_USER_APPTS = gql`
  query {
    apptByUser {
        date, 
        time,
        provider,
        id
      }
    }
  `