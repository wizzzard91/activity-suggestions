export const typeDefs = `#graphql
type ActivitySuggestion {
  activityName: String!
  rank: Int!
}

type DaySuggestion {
  date: String!
  activities: [ActivitySuggestion!]!
}

type SuggestionsResponse {
  data: [DaySuggestion!]!
}

type Query {
  getSuggestions(city: String!): SuggestionsResponse!
}
`;