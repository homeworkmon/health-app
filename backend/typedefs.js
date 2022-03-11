const { gql } = require('apollo-server')

const typeDefs = gql`
    type User {
        username: String!
        password: String!
        email: String!
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
        allergies: Boolean
        allergyDetails: String
        medications: Boolean
        medicationDetails: String
        user: User!
        id: ID!
    }
    type Appointment {
        date: Float
        time: Float
        provider: String
        user: User!
        id: ID!
    }
    type Query {
        me: User
        allAppts: [Appointment]
        apptByUser: [Appointment]
        singleAppt(id: ID!): Appointment
        profile(id: ID!): Profile
    }
    type Token {
        value: String!
    }
    type Mutation {
        createUser(
            username: String!
            email: String!
            password: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
        createAppt(
            date: Float!
            time: Float!
            provider: String
        ): Appointment
        editAppt(
            date: Float!
            time: Float!
            provider: String
            id: ID!
        ): Appointment
        deleteAppt(
            id: ID!
        ): Boolean
        editProfile(
            name: String!
            dob: Float!
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
        ): Profile
    }
`
module.exports = typeDefs