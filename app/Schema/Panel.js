const { gql } = require('apollo-server-express');
// Los typeDefs son para graphql, de esta forma graphql,
// sabe que datos puedo retornar cuando consulto
const typeDefs = gql`
  type Subject {
    id: ID
    name: String
    description: String
    department: String
    backgroundColor: String
    backgroundImage: String
    backgroundColorCard: String
    backgroundCard: String
    dataAccess: String
    priority: Int
    status: Int
  }

  type Query {
    subjects: [Subject]
    subject(id: ID): Subject
  }

  type Mutation {
    createSubject(input: SubjectInput): Subject
    updateSubject(id: ID, input: SubjectInput): Subject
    deleteSubject(id: ID): Subject
    # crearProyecto(input: SubjectInput): Subject
  }

  input SubjectInput {
    name: String
    description: String
    department: String
    backgroundColor: String
    backgroundImage: String
    backgroundColorCard: String
    backgroundCard: String
    dataAccess: String
    priority: Int
    status: Int
  }
`;

module.exports = typeDefs;
