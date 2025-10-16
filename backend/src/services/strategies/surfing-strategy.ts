import { WeatherData } from "../../clients/types.js";
import { BaseStrategy } from "./base-strategy.js";

export class SurfingStrategy extends BaseStrategy {
  protected getDayRank(indexOfDayStart: number, indexOfDayEnd: number, weatherData: WeatherData): number {
    const overallTemperature = weatherData.hourly.temperature_2m.slice(indexOfDayStart, indexOfDayEnd);
    const averageTemperature = overallTemperature.reduce((sum, temp) => sum + temp, 0) / overallTemperature.length;

    const overallWindSpeed = weatherData.hourly.wind_speed_10m.slice(indexOfDayStart, indexOfDayEnd);
    const averageWindSpeed = overallWindSpeed.reduce((sum, speed) => sum + speed, 0) / overallWindSpeed.length;

    let rank = 0;
    if (averageWindSpeed > 20) {
      rank += 2;
    }
    if (averageWindSpeed > 30) {
      rank += 2;
    }
    if (averageWindSpeed > 40) {
      rank += 2;
    }

    
    if (averageTemperature > 15 && averageTemperature < 35) {
      rank += 2;
    }
    if (averageTemperature > 20 && averageTemperature < 30) {
      rank += 2;
    }

    return rank < 0 ? 0 : rank;
  }
}