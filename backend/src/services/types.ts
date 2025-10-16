export enum ActivityType {
  SKIING = "skiing",
  SURFING = "surfing",
  OUTDOOR_SIGHTSEEING = "outdoor sightseeing",
  INDOOR_SIGHTSEEING = "indoor sightseeing",
}

export interface Activity {
  activityName: ActivityType;
  rank: number;
}

export interface DailySuggestion {
  date: string;
  activities: Activity[];
}