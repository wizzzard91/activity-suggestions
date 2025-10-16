import { WeatherData } from "../../clients/types.js";
import { BaseStrategy } from "./base-strategy.js";

export class SkiingStrategy extends BaseStrategy {
  protected getDayRank(indexOfDayStart: number, indexOfDayEnd: number, weatherData: WeatherData): number {
    const overallSnowDepth = weatherData.hourly.snow_depth.slice(indexOfDayStart, indexOfDayEnd);
    const averageSnowDepth = overallSnowDepth.reduce((sum, depth) => sum + depth, 0) / overallSnowDepth.length;

    const overallTemperature = weatherData.hourly.temperature_2m.slice(indexOfDayStart, indexOfDayEnd);
    const averageTemperature = overallTemperature.reduce((sum, temp) => sum + temp, 0) / overallTemperature.length;

    const overallSnowfall = weatherData.hourly.snowfall.slice(indexOfDayStart, indexOfDayEnd);
    const totalSnowfall = overallSnowfall.reduce((sum, snowfall) => sum + snowfall, 0);


    let rank = 0;
    if (averageSnowDepth > 0) {
      rank += 2;
    }
    if (averageSnowDepth > 2) {
      rank += 2;
    }

    if (averageTemperature > 5) {
      rank -= 2;
    }
    if (averageTemperature < 0) {
      rank += 2;
    }
    if (averageTemperature < -5) {
      rank += 2;
    }

    if (totalSnowfall > 0) {
      rank += 2;
    }

    return rank < 0 ? 0 : rank;
  }
}