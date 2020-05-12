const { buildSchema } = require('graphql');

module.exports = buildSchema(`
  scalar Object

  type Comment {
    commentId: ID
    createdDate: Object
    modifiedDate: Object
    target: String
    body: String
    userId: ID
    username: String
    profilePic: String
  }

  input CommentInput {
    body: String!
    target: ID!
    user: ID!
  }

  type Issue {
    id: ID!
    createdDate: Object
    modifiedDate: Object
    activeAttempts: Int
    attempting: [ID]
    attempts: Int
    body: String
    comments: [ID]
    contributor: [String]
    language: [String]
    name: String
    open: Boolean
    organizationId: String
    organizationName: String
    organizationVerified: Boolean
    profilePic: String
    rep: Int
    repo: String
    userId: ID
    username: String
    fundedAmount: Float
    watching: [String]
    type: String
  }

  input IssueInput {
    attempting: [ID]
    attempts: Int
    body: String
    comments: [ID]
    contributor: String
    fundedAmount: Int
    language: [String]
    name: String
    organizationDescription: String
    organizationId: String
    organizationName: String
    organizationRepo: String
    organizationUrl: String
    rep: Int
    repo: String
    watching: [String]
  }

  type User {
    id: ID!
    createdDate: Object
    modifiedDate: Object
    firstName: String!
    lastName: String!
    email: String!
    watching: [String]
    rep: Int
    profilePic: String
    comments: [String]
    attempting: [ID]
    issuesNumber: [String]
    username: String
    githubLink: String
    personalLink: String
    preferredLanguages: [String]
    stackoverflowLink: String
    pullRequests: [String]
    upvotes: [ID]
    activePullRequests: Int
    completedPullRequests: Int
    dollarsEarned: Int
    isOnline: Boolean
    rejectedPullRequests: Int
  }

  input UserInput {
    firstName: String
    lastName: String
    email: String
    watching: [String]
    rep: Int
    profilePic: String
    comments: [String]
    attempting: [ID]
    issuesNumber: [String]
    username: String
    githubLink: String
    personalLink: String
    preferredLanguages: [String]
    stackoverflowLink: String
    pullRequests: [String]
    upvotes: [ID]
    activePullRequests: Int
    completedPullRequests: Int
    dollarsEarned: Int
    isOnline: Boolean
    rejectedPullRequests: Int
  }

  type Organization {
    id: ID!
    createdDate: Object
    modifiedDate: Object
    name: String!
    description: String!
    repoUrl: String!
    organizationUrl: String
    issues: [Object]
    logo: String
    verified: Boolean
    contributors: [Object]
    ownerId: ID
    totalFunded: Float
    preferredLanguages: [String]
  }

  input OrganizationInput {
    name: String
    description: String
    repoUrl: String
    organizationUrl: String
    logo: String
    verified: Boolean
  }

  type Error {
    message: String
  }

  union OrganizationResult = Organization | Error
  union IssueResult = Issue | Error

  type RootQuery {
    getIssues: [Issue!]!
    getUsers: [User!]!
    getOrganizations: [Organization!]!
    getComments: [Comment]

    getIssueComments(id: ID!): [Comment]

    oneIssue(id: ID!): IssueResult
    oneUser(column: String!, query: ID!): User!
    oneOrganization(id: ID!): OrganizationResult

    searchIssues(value: String!): [Issue!]!
    searchOrganizations(value: String!): [Organization!]!
    searchUsers(value: String!): [User!]!
  }

  type RootMutation {
    createIssue(issueInput: IssueInput): [Issue!]!
    createUser(userInput: UserInput): [User!]!
    createOrganization(organizationInput: OrganizationInput): [Organization!]!
    createComment(commentInput: CommentInput): Comment

    deleteIssue(id: ID!): String!
    deleteUser(id:ID!): String!
    deleteOrganization(id:ID!): String!

    transformIssue(id: ID!, issueInput: IssueInput): Issue!
    transformUser(id: ID!, userInput: UserInput): User!
    transformOrganization(id: ID!, organizationInput: OrganizationInput): Organization!

    updateIssueArray(id: ID, column: String, data: String, remove: Boolean): Issue!
    updateUserArray(id: ID, column: String, data: String, remove: Boolean): User!

    upvoteIssue(id: ID): Issue!
    userUpvote(id: ID): User!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);
