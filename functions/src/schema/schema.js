const { gql } = require('apollo-server');

const {
  Tag,
  Category,
  Status,
  User,
  Coordinate,
  StreetView,
  updateUpVoteAction,
  updateUpVoteResponse,
  AddorUpdateTagResponse,
  AddTagDataInput,
  UpdateTagDataInput,
  CoordinateInput,
  CategoryInput,
  StreetViewInput,
} = require('./map_schema');

const { Intent, Question } = require('./chatbot_schema');

const Query = `type Query {
  tagRenderList: [Tag]
  tag(id: ID!): Tag
  userAddTagHistory(uid: ID!): [Tag]!
  "true if the use have read the guide, need to add token in the header"
  hasReadGuide: Boolean!
  intentAnswer(intent: String!): String
}`;

const Mutation = `type Mutation {
  addNewTagData(data: addTagDataInput!): AddorUpdateTagResponse!
  updateTagData(tagId: ID!, data: updateTagDataInput!): AddorUpdateTagResponse!
  updateTagStatus(tagId: ID!, statusName: String!, description: String): Status!
  addNewIntent(userIntent: String!, userAnswer: String!): String
  updateUpVoteStatus(tagId: ID!, action: updateUpVoteAction!): updateUpVoteResponse
  "true the update is successful, need to add token in the header"
  setHasReadGuide: Boolean!
}`;

const typeDefs = gql(
  [
    Query,
    Tag,
    Category,
    Status,
    User,
    Coordinate,
    StreetView,
    Intent,
    Question,
    Mutation,
    updateUpVoteAction,
    updateUpVoteResponse,
    AddorUpdateTagResponse,
    AddTagDataInput,
    UpdateTagDataInput,
    CoordinateInput,
    CategoryInput,
    StreetViewInput,
  ].join('\n')
);

module.exports = typeDefs;
