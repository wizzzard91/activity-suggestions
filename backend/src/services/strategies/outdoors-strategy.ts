import { WeatherData } from "../../clients/types.js";
import { BaseStrategy } from "./base-strategy.js";

export class OutdoorsStrategy extends BaseStrategy {
  protected getDayRank(indexOfDayStart: number, indexOfDayEnd: number, weatherData: WeatherData): number {
    const overallTemperature = weatherData.hourly.temperature_2m.slice(indexOfDayStart, indexOfDayEnd);
    const averageTemperature = overallTemperature.reduce((sum, temp) => sum + temp, 0) / overallTemperature.length;

    const overallRainfall = weatherData.hourly.rain.slice(indexOfDayStart, indexOfDayEnd);
    const totalRainfall = overallRainfall.reduce((sum, rainfall) => sum + rainfall, 0);


    let rank = 0;
    if (totalRainfall > 2) {
      rank += 2;
    }
    if (totalRainfall > 4) {
      rank += 2;
    }
    if (totalRainfall > 6) {
      rank += 2;
    }
    if (totalRainfall > 8) {
      rank += 2;
    }

    if (averageTemperature < 10) {
      rank += 2;
    }
    if (averageTemperature > 35) {
      rank += 2;
    }

    return rank < 0 ? 0 : rank;
  }
}