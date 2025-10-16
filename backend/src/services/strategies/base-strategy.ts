import { WeatherData } from "../../clients/types.js";

export abstract class BaseStrategy {

  evaluate(weatherData: WeatherData): { date: string; rank: number }[] {    
    const result = [];

    let indexOfDayStart = 0;
    let previousDate = weatherData.hourly.time[0].toISOString().split('T')[0];
    const totalArraySize = weatherData.hourly.time.length;

    for (let i = 1; i < totalArraySize; i++) {
      const currentDate = weatherData.hourly.time[i].toISOString().split('T')[0];
      if (currentDate !== previousDate) { 
        const rank = this.getDayRank(indexOfDayStart, i - 1, weatherData);

        result.push({
          date: previousDate,
          rank,
        })

        indexOfDayStart = i;
        previousDate = currentDate;
      }
    }

    // process latest date
    const rank = this.getDayRank(indexOfDayStart, totalArraySize - 1, weatherData)
    result.push({
      date: previousDate,
      rank,
    })

    return result;
  }

  protected abstract getDayRank(indexOfDayStart: number, indexOfDayEnd: number, weatherData: WeatherData): number;
}
