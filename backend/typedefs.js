const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        username: String!
        password: String!
        id: ID!
        profile: Profile
        appointments: [Appointment]
    }
    type Profile {
        name: String!
        dob: String!
        healthcard: String!
        street: String!
        city: String
        postalCode: String
        gender: String
        maritalStatus: String
        phone: String
        contactByPhone: Boolean
        emergencyContact: String!
        emergencyPhone: String!
        allergies: Boolean
        allergyDetails: String
        medications: Boolean
        medicationDetails: String
        id: ID!
    }
    type Appointment {
        date: String!
        provider: String
        user: User!
        id: ID!
    }
    type Query {
        me: User
        apptByProvider(provider: String!): [Appointment]
        apptByUser: [Appointment]
        singleAppt(id: ID!): Appointment
        getProfile: User
    }
    type Token {
        value: String!
    }
    type Mutation {
        createUser(
            username: String!
            password: String!
        ): Boolean
        login(
            username: String!
            password: String!
        ): Token
        createAppt(
            date: String!
            provider: String!
        ): Appointment
        editAppt(
            date: String!
            provider: String
            id: ID!
        ): Appointment
        deleteAppt(
            id: ID!
        ): Boolean
        editProfile(
            name: String!
            dob: String!
            healthcard: String!
            street: String
            city: String
            postalCode: String
            gender: String
            maritalStatus: String
            phone: String
            contactByPhone: Boolean
            emergencyContact: String
            emergencyPhone: String
            allergies: Boolean
            allergyDetails: String
            medications: Boolean
            medicationDetails: String
            id: ID
        ): User
    }
`
module.exports = typeDefs