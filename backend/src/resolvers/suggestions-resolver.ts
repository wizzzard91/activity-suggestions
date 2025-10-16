import { SuggestionsService } from '../services/suggestions-service.js';

export const createResolvers = (suggestionsService: SuggestionsService) => ({
  Query: {
    getSuggestions: async (_parent: unknown, { city }: { city: string }) => {
      return await suggestionsService.getSuggestions(city);
    },
  },
});
