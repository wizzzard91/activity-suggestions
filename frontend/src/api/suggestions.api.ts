import { gql } from '@apollo/client';

export interface ActivitySuggestion {
  activityName: string;
  rank: number;
}

export interface DaySuggestion {
  date: string;
  activities: ActivitySuggestion[];
}

export interface SuggestionsResponse {
  data: DaySuggestion[];
}

export interface SuggestionsData {
  getSuggestions: SuggestionsResponse;
}

export const getSuggestionsQuery = gql`
  query GetSuggestions($city: String!) {
    getSuggestions(city: $city) {
      data {
        date
        activities {
          activityName
          rank
        }
      }
    }
  }
`;
