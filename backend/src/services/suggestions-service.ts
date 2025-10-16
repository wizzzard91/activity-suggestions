import { OpenMeteoClient } from "../clients/open-meteo-client.js";
import { ActivityType, DailySuggestion } from "./types.js";

export class SuggestionsService {
  constructor(private openMeteoClient: OpenMeteoClient) {}
  
  async getSuggestions(city: string): Promise<{ data: DailySuggestion[] }> {
    // mocked for now
    const result: DailySuggestion[] = [
      {
        date: "2023-10-01",
        activities: [
          { activityName: ActivityType.INDOOR_SIGHTSEEING, rank: 1 },
          { activityName: ActivityType.OUTDOOR_SIGHTSEEING, rank: 2 },
        ],
      }
    ];
    return { data: result } ;
  }
}