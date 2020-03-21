const { gql } = require("apollo-boost");
module.exports = gql`
  type Query {
    hello: String
    landmarks: [Landmark]!
    landmark(name: String): Landmark!
  }
  type Landmark {
    id: ID!
    name: String!
    address: String!
    url: String!
    description: String!
    coordinates: [Float!]!
  }
  type Mutation { # CRUD operation
    createLandmark(landmark: LandmarkInput!): Landmark!
    deleteLandmark(id: ID!): Landmark!
    updateLandmark(id: ID!, landmark: LandmarkInput!): Landmark!
  }
  input LandmarkInput {
    id: ID
    name: String!
    address: String!
    url: String!
    description: String!
    coordinates: [Float!]!
  }
`;