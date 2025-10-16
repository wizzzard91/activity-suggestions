import { ActivityType } from "../types.js";
import { BaseStrategy } from "./base-strategy.js";
import { IndoorsStrategy } from "./indoors-strategy.js";
import { OutdoorsStrategy } from "./outdoors-strategy.js";
import { SkiingStrategy } from "./skiing-strategy.js";
import { SurfingStrategy } from "./surfing-strategy.js";


const strategiesMap = new Map<string, () => BaseStrategy>(
  [
    [ActivityType.INDOOR_SIGHTSEEING, () => new IndoorsStrategy()],
    [ActivityType.OUTDOOR_SIGHTSEEING, () => new OutdoorsStrategy()],
    [ActivityType.SKIING, () => new SkiingStrategy()],
    [ActivityType.SURFING, () => new SurfingStrategy()],
  ]
)


export function getActivityStrategy(activityType: ActivityType): BaseStrategy {
  const strategy = strategiesMap.get(activityType);
  if (!strategy) {
    throw new Error(`No strategy found for activity type: ${activityType}`);
  }
  return strategy();
}
