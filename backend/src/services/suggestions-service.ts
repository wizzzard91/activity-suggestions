import { OpenMeteoClient } from "../clients/open-meteo-client.js";
import { getActivityStrategy } from "./strategies/strategies-factory.js";
import { ActivityType, DailySuggestion } from "./types.js";

export class SuggestionsService {
  private openMeteoClient: OpenMeteoClient;

  private activitiesToRank: ActivityType[] = [
    ActivityType.SKIING,
    ActivityType.SURFING,
    ActivityType.INDOOR_SIGHTSEEING,
    ActivityType.OUTDOOR_SIGHTSEEING,
  ];

  constructor(openMeteoClient: OpenMeteoClient) {
    this.openMeteoClient = openMeteoClient;
  }
  
  async getSuggestions(city: string): Promise<{ data: DailySuggestion[] }> {
    const weatherData = await this.openMeteoClient.getWeatherData({ cityName: city });

    const resultMap: Map<string, DailySuggestion> = new Map();

    for (const activity of this.activitiesToRank) {
      const strategy = getActivityStrategy(activity);
      const rankResults = strategy.evaluate(weatherData);
      
      console.log(`Activity: ${activity}, results:`, rankResults);

      for (const { date, rank } of rankResults) {
        if (!resultMap.has(date)) {
          resultMap.set(date, { date, activities: [] });
        }
        resultMap.get(date)!.activities.push({ activityName: activity, rank });
      }
    }

    const result = Array.from(resultMap.values());
    console.log('Final result:', JSON.stringify(result, null, 2));
    return { data: result };
  }
}
