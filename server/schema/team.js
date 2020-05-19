export default `
    type Team {
        owner: User!
        members: [User!]!
        channels: [Channel!]!
    }
    type CreateTeamResponse {
        ok: Boolean!
        errors: [Error!]
    }
    type Query {
        teams: [Team!]!
    }
    type Mutation {
        createTeam(name: String!): Boolean!
    }
`;
